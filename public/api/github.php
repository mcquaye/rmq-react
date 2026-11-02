<?php

// Serves the contribution calendar so the GitHub token never reaches the browser.
// The token comes from the GITHUB_TOKEN environment variable, or from a file named
// .github-token in the folder above the website root.

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

$calendar = fetchCalendar(readToken());

if ($calendar !== null) {
	file_put_contents($cacheFile, $calendar, LOCK_EX);
	respond($calendar);
}

// GitHub is unavailable: an older graph beats no graph
if ($hasCache) {
	respond(file_get_contents($cacheFile));
}

http_response_code(502);
echo json_encode(['error' => 'Contributions are unavailable right now']);

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

	$tokenFile = dirname(__DIR__, 2) . '/.github-token';

	return is_readable($tokenFile) ? trim(file_get_contents($tokenFile)) : null;
}

function fetchCalendar(?string $token): ?string
{
	if (!$token) {
		error_log('github.php: no GitHub token configured');
		return null;
	}

	$query = 'query { user(login: "' . GITHUB_USERNAME . '") { contributionsCollection { contributionCalendar {'
		. ' totalContributions weeks { contributionDays { contributionCount date } } } } } }';

	$body = @file_get_contents('https://api.github.com/graphql', false, stream_context_create([
		'http' => [
			'method' => 'POST',
			'timeout' => 10,
			'ignore_errors' => true,
			'header' => "Authorization: Bearer {$token}\r\nContent-Type: application/json\r\nUser-Agent: " . GITHUB_USERNAME . "\r\n",
			'content' => json_encode(['query' => $query]),
		],
	]));

	$calendar = $body === false
		? null
		: json_decode($body, true)['data']['user']['contributionsCollection']['contributionCalendar'] ?? null;

	if ($calendar === null) {
		error_log('github.php: GitHub did not return a calendar');
		return null;
	}

	return json_encode($calendar);
}
