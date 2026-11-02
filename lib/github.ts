const GITHUB_API = "https://api.github.com";
// Served by public/api/github.php, which holds the token on the server
const CONTRIBUTIONS_URL = "/api/github.php";

async function fetchGitHub<T>(path: string): Promise<T> {
	const res = await fetch(`${GITHUB_API}${path}`, {
		headers: { Accept: "application/vnd.github+json" },
	});
	if (!res.ok) {
		if (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0") {
			throw new Error("GitHub API rate limit exceeded. Please try again later.");
		}
		throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
	}
	return res.json();
}

export interface GitHubUser {
	login: string;
	name: string;
	bio: string;
	avatar_url: string;
	html_url: string;
	public_repos: number;
	followers: number;
	following: number;
	created_at: string;
	location: string;
	company: string;
	blog: string;
}

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	updated_at: string;
	created_at: string;
	pushed_at: string;
	topics: string[];
	fork: boolean;
	homepage: string | null;
}

export interface GitHubEvent {
	id: string;
	type: string;
	created_at: string;
	repo: { name: string; url: string };
	payload: {
		commits?: Array<{ message: string; sha: string }>;
		action?: string;
		ref?: string;
		ref_type?: string;
		pull_request?: { title: string; html_url: string };
		size?: number;
	};
}

export async function getUserProfile(username: string): Promise<GitHubUser> {
	return fetchGitHub<GitHubUser>(`/users/${username}`);
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
	const repos = await fetchGitHub<GitHubRepo[]>(
		`/users/${username}/repos?sort=updated&per_page=30&type=owner`,
	);
	return repos.filter((r) => !r.fork);
}

export async function getUserEvents(username: string): Promise<GitHubEvent[]> {
	return fetchGitHub<GitHubEvent[]>(`/users/${username}/events/public?per_page=30`);
}

// GraphQL contribution calendar
export interface ContributionDay {
	date: string;
	contributionCount: number;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
	totalContributions: number;
	weeks: ContributionWeek[];
}

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
	try {
		const res = await fetch(CONTRIBUTIONS_URL);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}
