<?php

// Serves the contribution calendar so the GitHub token never reaches the browser.
// The token comes from the GITHUB_TOKEN environment variable, from github-token.php next to
// this file (which runs rather than shows, and .htaccess blocks), or from a file named
// .github-token in the folder above the website root or the home folder.

const GITHUB_USERNAME = 'mcquaye';
const CACHE_SECONDS = 1800;

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	http_response_code(405);
	header('Allow: GET');
	echo json_encode(['error' => 'Method not allowed']);
	exit;
}

$cacheFile = sys_get_temp_dir() . '/' . GITHUB_USERNAME . '-github-contributions.json';
$hasCache = is_file($cacheFile);

if ($hasCache && time() - filemtime($cacheFile) < CACHE_SECONDS) {
	respond(file_get_contents($cacheFile));
}

$token = readToken();
$calendar = $token ? fetchCalendar($token) : null;

if ($calendar !== null) {
	file_put_contents($cacheFile, $calendar, LOCK_EX);
	respond($calendar);
}

// GitHub is unavailable: an older graph beats no graph
if ($hasCache) {
	respond(file_get_contents($cacheFile));
}

// 503 rather than 502, because Cloudflare swaps a 502 for its own page and the reason is lost
http_response_code(503);
header('Cache-Control: no-store');
echo json_encode(['error' => $token
	? 'GitHub did not send the contributions, so check the token is valid and has not expired'
	: (ini_get('open_basedir')
		? 'The server has no GitHub token yet, and this host only lets the site read inside its own folders'
		: 'The server has no GitHub token yet. Put it in api/github-token.php')]);

function respond(string $calendar): never
{
	header('Cache-Control: public, max-age=300');
	echo $calendar;
	exit;
}

function readToken(): ?string
{
	$token = getenv('GITHUB_TOKEN');
	if ($token) {
		return $token;
	}

	$tokenScript = __DIR__ . '/github-token.php';
	if (is_file($tokenScript)) {
		$token = include $tokenScript;
		if (is_string($token) && trim($token) !== '') {
			return trim($token);
		}
	}

	// File managers often hide dot files or add .txt, so accept those names too
	foreach (tokenFolders() as $folder) {
		foreach (['.github-token', 'github-token', '.github-token.txt', 'github-token.txt'] as $name) {
			$tokenFile = "{$folder}/{$name}";
			if (@is_readable($tokenFile)) {
				$token = trim(file_get_contents($tokenFile));
				if ($token !== '') {
					return $token;
				}
			}
		}
	}

	return null;
}

// The folder above the website root, then the hosting account's home folder
function tokenFolders(): array
{
	$folders = [dirname(__DIR__, 2)];
	$home = getenv('HOME') ?: (function_exists('posix_getpwuid') && function_exists('posix_geteuid') ? (posix_getpwuid(posix_geteuid())['dir'] ?? '') : '');
	if ($home) {
		$folders[] = $home;
	}

	return array_unique($folders);
}

function fetchCalendar(string $token): ?string
{
	$query = 'query { user(login: "' . GITHUB_USERNAME . '") { contributionsCollection { contributionCalendar {'
		. ' totalContributions weeks { contributionDays { contributionCount date } } } } } }';
	$headers = ["Authorization: Bearer {$token}", 'Content-Type: application/json', 'User-Agent: ' . GITHUB_USERNAME];
	$payload = json_encode(['query' => $query]);

	$body = postJson('https://api.github.com/graphql', $headers, $payload);
	$calendar = $body === null
		? null
		: json_decode($body, true)['data']['user']['contributionsCollection']['contributionCalendar'] ?? null;

	if ($calendar === null) {
		error_log('github.php: GitHub did not return a calendar: ' . substr((string) $body, 0, 300));
		return null;
	}

	return json_encode($calendar);
}

// cURL first, because many shared hosts switch off allow_url_fopen
function postJson(string $url, array $headers, string $payload): ?string
{
	if (function_exists('curl_init')) {
		$request = curl_init($url);
		curl_setopt_array($request, [
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => $payload,
			CURLOPT_HTTPHEADER => $headers,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 10,
		]);
		$body = curl_exec($request);
		if ($body === false) {
			error_log('github.php: cURL failed: ' . curl_error($request));
		}

		return $body === false ? null : $body;
	}

	$body = @file_get_contents($url, false, stream_context_create([
		'http' => [
			'method' => 'POST',
			'timeout' => 10,
			'ignore_errors' => true,
			'header' => implode("\r\n", $headers) . "\r\n",
			'content' => $payload,
		],
	]));

	return $body === false ? null : $body;
}
