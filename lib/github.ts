const GITHUB_API = "https://api.github.com";
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

function headers(): HeadersInit {
	const h: HeadersInit = { Accept: "application/vnd.github+json" };
	if (TOKEN) {
		h.Authorization = `Bearer ${TOKEN}`;
	}
	return h;
}

async function fetchGitHub<T>(path: string): Promise<T> {
	const res = await fetch(`${GITHUB_API}${path}`, { headers: headers() });
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

async function fetchGraphQL<T>(query: string): Promise<T> {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});
	if (!res.ok) {
		throw new Error(`GitHub GraphQL error: ${res.status}`);
	}
	return res.json();
}

export async function getContributionCalendar(
	username: string,
): Promise<ContributionCalendar | null> {
	if (!TOKEN) return null;
	try {
		const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
		const data = await fetchGraphQL<{
			data: { user: { contributionsCollection: { contributionCalendar: ContributionCalendar } } };
		}>(query);
		return data.data.user.contributionsCollection.contributionCalendar;
	} catch {
		return null;
	}
}
