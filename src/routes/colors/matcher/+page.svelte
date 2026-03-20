<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/auth';
	import { api } from '$lib/api';

	interface PantoneSwatch {
		pms: string;
		series: string;
		hex: string;
		name: string;
	}

	interface ColorMatch {
		swatch: PantoneSwatch;
		distance: number;
		rank: number;
	}

	let hexInput = $state('#E6007E');
	let matches = $state<ColorMatch[]>([]);
	let isLoading = $state(false);
	let error = $state('');
	let seriesFilter = $state<'BOTH' | 'C' | 'U'>('BOTH');
	let limit = $state(10);

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});

	async function findMatches() {
		if (!hexInput) return;

		try {
			isLoading = true;
			error = '';

			const response = await api.get<{
				input: { hex: string; series: string; limit: number };
				results: ColorMatch[];
				meta: { resultCount: number; note: string };
			}>(`/api/colors/pantone/match?hex=${encodeURIComponent(hexInput)}&series=${seriesFilter}&limit=${limit}`);

			matches = response.results;
		} catch (err: any) {
			error = err.message || 'Failed to find matches';
			matches = [];
		} finally {
			isLoading = false;
		}
	}

	function updateHexFromPicker(event: Event) {
		const target = event.target as HTMLInputElement;
		hexInput = target.value.toUpperCase();
	}

	async function copyHex(hex: string) {
		try {
			await navigator.clipboard.writeText(hex);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

{#if $isAuthenticated}
	<div>
		<!-- Header -->
		<div class="mb-7">
			<h1 class="text-[28px] font-bold tracking-tight text-gray-900">Pantone Color Matcher</h1>
			<p class="text-sm text-gray-600 mt-1">
				Find the closest matching Pantone colors for any hex value
			</p>
		</div>

		<!-- Input Card -->
		<div class="bg-white rounded-card border border-gray-200 p-6 mb-6" style="box-shadow: var(--shadow-card)">
			<div class="flex flex-col md:flex-row gap-6">
				<!-- Color Preview -->
				<div class="flex-shrink-0">
					<div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
						Current Color
					</div>
					<div class="relative">
						<div
							class="w-32 h-32 rounded-lg border-2 border-gray-300"
							style="background-color: {hexInput}"
						></div>
						<input
							type="color"
							value={hexInput}
							oninput={updateHexFromPicker}
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							title="Click to pick a color"
						/>
					</div>
					<div class="text-xs text-gray-500 mt-2 text-center">Click to pick</div>
				</div>

				<!-- Input Fields -->
				<div class="flex-1 space-y-4">
					<!-- Hex Input -->
					<div>
						<label for="hex-input" class="block text-sm font-semibold text-gray-700 mb-2">
							Hex Color
						</label>
						<input
							id="hex-input"
							type="text"
							bind:value={hexInput}
							placeholder="#E6007E"
							class="block w-full px-4 py-3 text-lg font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-magenta-500"
						/>
					</div>

					<!-- Filters Row -->
					<div class="flex gap-4">
						<!-- Series -->
						<div class="flex-1">
							<label class="block text-sm font-semibold text-gray-700 mb-2">Series</label>
							<div class="flex gap-2">
								<button
									onclick={() => (seriesFilter = 'BOTH')}
									class="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all {seriesFilter === 'BOTH'
										? 'bg-magenta-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
								>
									Both
								</button>
								<button
									onclick={() => (seriesFilter = 'C')}
									class="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all {seriesFilter === 'C'
										? 'bg-magenta-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
								>
									Coated
								</button>
								<button
									onclick={() => (seriesFilter = 'U')}
									class="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all {seriesFilter === 'U'
										? 'bg-magenta-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
								>
									Uncoated
								</button>
							</div>
						</div>

						<!-- Limit -->
						<div class="w-32">
							<label for="limit-input" class="block text-sm font-semibold text-gray-700 mb-2">
								Results
							</label>
							<input
								id="limit-input"
								type="number"
								bind:value={limit}
								min="1"
								max="50"
								class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-magenta-500"
							/>
						</div>
					</div>

					<!-- Find Button -->
					<button
						onclick={findMatches}
						disabled={isLoading}
						class="w-full px-6 py-3 bg-magenta-600 text-white font-semibold rounded-lg hover:bg-magenta-700 disabled:opacity-50 transition-all duration-150 hover:-translate-y-0.5"
						style="box-shadow: 0 1px 3px rgba(230, 0, 126, 0.3)"
					>
						{#if isLoading}
							<span class="flex items-center justify-center gap-2">
								<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Finding Matches...
							</span>
						{:else}
							Find Pantone Matches
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Error -->
		{#if error}
			<div class="bg-rose-50 border border-rose-200 rounded-card p-4 mb-6">
				<p class="text-rose-700">{error}</p>
			</div>
		{/if}

		<!-- Results -->
		{#if matches.length > 0}
			<div class="bg-white rounded-card border border-gray-200 overflow-hidden" style="box-shadow: var(--shadow-card)">
				<div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
					<h2 class="text-lg font-semibold text-gray-900">Closest Matches ({matches.length})</h2>
					<p class="text-sm text-gray-600 mt-1">Sorted by color distance (lower = closer match)</p>
				</div>

				<div class="divide-y divide-gray-200">
					{#each matches as match}
						<div class="px-6 py-4 hover:bg-gray-50 transition-colors">
							<div class="flex items-center gap-4">
								<!-- Rank Badge -->
								<div class="flex-shrink-0">
									<div
										class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
										class:bg-magenta-600={match.rank === 1}
										class:bg-cyan-500={match.rank === 2}
										class:bg-yellow-500={match.rank === 3}
										class:bg-gray-400={match.rank > 3}
									>
										{match.rank}
									</div>
								</div>

								<!-- Color Swatch -->
								<div
									class="w-16 h-16 rounded-lg border-2 border-gray-300 flex-shrink-0"
									style="background-color: {match.swatch.hex}"
								></div>

								<!-- Info -->
								<div class="flex-1 min-w-0">
									<div class="flex items-baseline gap-2">
										<h3 class="text-lg font-bold text-gray-900">
											{match.swatch.pms} {match.swatch.series}
										</h3>
										<span class="text-sm font-mono text-gray-600">{match.swatch.hex}</span>
									</div>
									<p class="text-sm text-gray-600 mt-1">
										Distance: <span class="font-semibold">{match.distance}</span>
										{#if match.distance < 10}
											<span class="text-emerald-600 font-medium">(Excellent match)</span>
										{:else if match.distance < 30}
											<span class="text-cyan-600 font-medium">(Good match)</span>
										{:else if match.distance < 50}
											<span class="text-yellow-600 font-medium">(Fair match)</span>
										{/if}
									</p>
								</div>

								<!-- Copy Button -->
								<button
									onclick={() => copyHex(match.swatch.hex)}
									class="flex-shrink-0 px-4 py-2 text-sm font-medium text-magenta-600 hover:bg-magenta-50 rounded-lg transition-colors"
									title="Copy hex value"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}
