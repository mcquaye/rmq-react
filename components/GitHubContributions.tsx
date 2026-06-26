"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
	getContributionCalendar,
	getUserEvents,
	getUserProfile,
	type ContributionDay,
} from "@/lib/github";

function getLevel(count: number): number {
	if (count === 0) return 0;
	if (count <= 3) return 1;
	if (count <= 7) return 2;
	if (count <= 12) return 3;
	return 4;
}

const LEVEL_COLORS = [
	"bg-slate-800/40",
	"bg-cyan-950/70",
	"bg-cyan-800/70",
	"bg-cyan-500/80",
	"bg-cyan-400",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GITHUB_USERNAME = "mcquaye";

export default function GitHubContributions() {
	const [calendar, setCalendar] = useState<{
		totalContributions: number;
		weeks: { contributionDays: ContributionDay[] }[];
	} | null>(null);
	const [events, setEvents] = useState<Array<{ type: string; created_at: string }>>([]);
	const [profile, setProfile] = useState<{ public_repos: number } | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [calResult, evtsResult, profResult] = await Promise.allSettled([
					getContributionCalendar(GITHUB_USERNAME),
					getUserEvents(GITHUB_USERNAME),
					getUserProfile(GITHUB_USERNAME),
				]);

				if (calResult.status === "fulfilled") setCalendar(calResult.value);
				if (evtsResult.status === "fulfilled") setEvents(evtsResult.value);
				if (profResult.status === "fulfilled") setProfile(profResult.value);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	const totalContributions = calendar?.totalContributions ?? events?.length ?? 0;
	const pushCount = events?.filter((e) => e.type === "PushEvent").length ?? 0;
	const prCount = events?.filter((e) => e.type === "PullRequestEvent").length ?? 0;
	const hasEvents = events.length > 0;

	// Build weeks from calendar (or from events as fallback)
	let weeks: ContributionDay[][] = [];

	if (calendar?.weeks) {
		weeks = calendar.weeks.map((w) => w.contributionDays);
	} else if (events.length > 0) {
		const contributionMap = new Map<string, number>();
		events.forEach((e) => {
			const key = e.created_at.split("T")[0];
			contributionMap.set(key, (contributionMap.get(key) || 0) + 1);
		});
		const today = new Date();
		const start = new Date(today);
		start.setDate(start.getDate() - 90);
		const days: ContributionDay[] = [];
		const d = new Date(start);
		while (d <= today) {
			const key = d.toISOString().split("T")[0];
			days.push({ date: key, contributionCount: contributionMap.get(key) || 0 });
			d.setDate(d.getDate() + 1);
		}
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}
	}

	// Month labels
	const monthLabels: { label: string; index: number; key: string }[] = [];
	if (weeks.length > 0) {
		let lastMonth = -1;
		let lastYear = -1;
		weeks.forEach((week, wi) => {
			const firstDay = week[0];
			if (firstDay) {
				const d = new Date(firstDay.date + "T00:00:00");
				const month = d.getMonth();
				const year = d.getFullYear();
				if (month !== lastMonth || year !== lastYear) {
					monthLabels.push({ label: MONTHS[month], index: wi, key: `${MONTHS[month]}-${year}` });
					lastMonth = month;
					lastYear = year;
				}
			}
		});
	}

	if (loading) {
		return (
			<>
				<div className='mb-10 text-center'>
					<h3 className='text-2xl md:text-3xl font-bold text-white'>
						GitHub <span className='text-cyan-400'>Contributions</span>
					</h3>
				</div>
				<div className='space-y-6'>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className='rounded-2xl h-24 bg-gradient-to-b from-black to-[#050a18] border border-slate-800 animate-pulse'
							/>
						))}
					</div>
					<div className='rounded-2xl h-[180px] bg-gradient-to-b from-black to-[#050a18] border border-slate-800 animate-pulse' />
				</div>
			</>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}>
			<div className='mb-10 text-center'>
				<h3 className='text-2xl md:text-3xl font-bold text-white'>
					GitHub <span className='text-cyan-400'>Contributions</span>
				</h3>
			</div>

			<div className='space-y-6'>
				{/* Stats cards */}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
					<StatCard
						icon={<GitCommit className='h-4 w-4 text-cyan-400' />}
						value={totalContributions.toLocaleString()}
						label='contributions in the last year'
						delay={0}
					/>
					{hasEvents && (
						<>
							<StatCard
								icon={<GitCommit className='h-4 w-4 text-cyan-400' />}
								value={pushCount.toString()}
								label='recent pushes'
								delay={0.1}
							/>
							<StatCard
								icon={<GitPullRequest className='h-4 w-4 text-cyan-400' />}
								value={prCount.toString()}
								label='recent PRs'
								delay={0.2}
							/>
						</>
					)}
				</div>

				{/* Contribution heatmap */}
				{weeks.length > 0 && (
					<div className='rounded-2xl bg-gradient-to-b from-black to-[#050a18] border border-slate-800 p-6 overflow-x-auto'>
						<div className='flex items-center justify-between mb-5'>
							<h3 className='text-sm font-medium text-white/80'>
								{calendar
									? `${totalContributions.toLocaleString()} contributions in the last year`
									: "Recent activity (90 days)"}
							</h3>
							<a
								href={`https://github.com/${GITHUB_USERNAME}`}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors shrink-0'>
								<FaGithub className='h-3.5 w-3.5' />
								View profile
								<ExternalLink className='h-3 w-3' />
							</a>
						</div>

						{/* Month labels */}
						<div className='flex mb-1 ml-8'>
							<div className='flex w-full' style={{ gap: "2px" }}>
								{monthLabels.map((m) => (
									<div
										key={m.key}
										className='text-[10px] text-slate-500'
										style={{ position: "relative", left: `${m.index * 14}px` }}>
										{m.label}
									</div>
								))}
							</div>
						</div>

						<div className='flex gap-0.5'>
							{/* Day labels */}
							<div className='flex flex-col gap-0.5 pr-1.5 pt-0'>
								{["", "M", "", "W", "", "F", ""].map((label, i) => (
									<div key={i} className='h-3 text-[9px] text-slate-600 leading-3 text-right w-5'>
										{label}
									</div>
								))}
							</div>

							{/* Grid */}
							<div className='flex gap-0.5'>
								{weeks.map((week, wi) => (
									<div key={wi} className='flex flex-col gap-0.5'>
										{week.map((day, di) => (
											<motion.div
												key={`${wi}-${di}`}
												initial={{ opacity: 0, scale: 0 }}
												whileInView={{ opacity: 1, scale: 1 }}
												viewport={{ once: true }}
												transition={{
													delay: Math.min((wi * 7 + di) * 0.002, 1.5),
													duration: 0.15,
												}}
												className={`h-3 w-3 rounded-sm ${
													LEVEL_COLORS[getLevel(day.contributionCount)]
												}`}
												title={`${day.date}: ${day.contributionCount} contributions`}
											/>
										))}
									</div>
								))}
							</div>
						</div>

						{/* Legend */}
						<div className='mt-4 flex items-center justify-end gap-1.5'>
							<span className='text-[10px] text-slate-500'>Less</span>
							{LEVEL_COLORS.map((color, i) => (
								<div key={i} className={`h-3 w-3 rounded-sm ${color}`} />
							))}
							<span className='text-[10px] text-slate-500'>More</span>
						</div>
					</div>
				)}

				{weeks.length === 0 && (
					<div className='rounded-2xl bg-gradient-to-b from-black to-[#050a18] border border-slate-800 p-10 text-center'>
						<p className='text-slate-400'>
							Add a GitHub token to{" "}
							<code className='text-xs bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400'>.env</code>{" "}
							as{" "}
							<code className='text-xs bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400'>
								NEXT_PUBLIC_GITHUB_TOKEN
							</code>{" "}
							to see your contribution graph.
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
}

function StatCard({
	icon,
	value,
	label,
	delay,
}: {
	icon: React.ReactNode;
	value: string;
	label: string;
	delay: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.4 }}
			className='rounded-2xl bg-gradient-to-b from-black to-[#050a18] border border-slate-800 p-5 hover:border-cyan-400/30 transition-colors'>
			<div className='mb-2'>{icon}</div>
			<div className='text-3xl font-bold text-white'>{value}</div>
			<div className='text-xs text-slate-400 mt-0.5'>{label}</div>
		</motion.div>
	);
}
