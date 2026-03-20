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
		notes?: string;
	}

	let swatches = $state<PantoneSwatch[]>([]);
	let filteredSwatches = $state<PantoneSwatch[]>([]);
	let isLoading = $state(true);
	let error = $state('');
	let searchQuery = $state('');
	let seriesFilter = $state<'ALL' | 'C' | 'U'>('ALL');
	let copiedHex = $state<string | null>(null);

	onMount(async () => {
		if (!$isAuthenticated) {
			goto('/login');
			return;
		}

		try {
			swatches = await api.get<PantoneSwatch[]>('/api/colors/swatches');
			filterSwatches();
		} catch (err: any) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	function filterSwatches() {
		let result = swatches;

		// Filter by series
		if (seriesFilter !== 'ALL') {
			result = result.filter((s) => s.series === seriesFilter);
		}

		// Filter by search
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(s) =>
					s.pms.toLowerCase().includes(query) ||
					s.name.toLowerCase().includes(query) ||
					s.hex.toLowerCase().includes(query)
			);
		}

		filteredSwatches = result;
	}

	$effect(() => {
		searchQuery;
		seriesFilter;
		filterSwatches();
	});

	async function copyHex(hex: string) {
		try {
			await navigator.clipboard.writeText(hex);
			copiedHex = hex;
			setTimeout(() => (copiedHex = null), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

{#if $isAuthenticated}
	<div>
		<!-- Header -->
		<div class="mb-7">
			<h1 class="text-[28px] font-bold tracking-tight text-gray-900">Pantone Swatch Library</h1>
			<p class="text-sm text-gray-600 mt-1">
				Browse {swatches.length} Pantone swatches — click any swatch to copy its hex value
			</p>
		</div>

		<!-- Filters -->
		<div class="mb-6 flex flex-col sm:flex-row gap-4">
			<!-- Search -->
			<div class="flex-1 relative">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search by PMS, name, or hex..."
					class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-magenta-500 focus:border-magenta-500 sm:text-sm"
				/>
			</div>

			<!-- Series Filter -->
			<div class="flex gap-2">
				<button
					onclick={() => (seriesFilter = 'ALL')}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {seriesFilter === 'ALL'
						? 'bg-magenta-600 text-white'
						: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
				>
					All
				</button>
				<button
					onclick={() => (seriesFilter = 'C')}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {seriesFilter === 'C'
						? 'bg-magenta-600 text-white'
						: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
				>
					Coated (C)
				</button>
				<button
					onclick={() => (seriesFilter = 'U')}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {seriesFilter === 'U'
						? 'bg-magenta-600 text-white'
						: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}"
				>
					Uncoated (U)
				</button>
			</div>
		</div>

		<!-- Results count -->
		<p class="text-sm text-gray-500 mb-4">
			Showing {filteredSwatches.length} of {swatches.length} swatches
		</p>

		{#if isLoading}
			<div class="flex justify-center py-12">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta-600"></div>
			</div>
		{:else if error}
			<div class="bg-rose-50 border border-rose-200 rounded-card p-4">
				<p class="text-rose-700">{error}</p>
			</div>
		{:else if filteredSwatches.length === 0}
			<div class="text-center py-12">
				<svg
					class="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
					/>
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">No swatches found</h3>
				<p class="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
			</div>
		{:else}
			<!-- Swatch Grid -->
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
				{#each filteredSwatches as swatch}
					<button
						onclick={() => copyHex(swatch.hex)}
						class="group relative bg-white rounded-lg overflow-hidden transition-all duration-150 border-2 hover:-translate-y-0.5"
						style="box-shadow: var(--shadow-card); border-color: {copiedHex === swatch.hex
							? 'var(--magenta)'
							: 'transparent'}"
						title="Click to copy {swatch.hex}"
					>
						<!-- Color Swatch -->
						<div class="aspect-square" style="background-color: {swatch.hex}"></div>

						<!-- Info -->
						<div class="p-2 text-center">
							<div class="text-xs font-semibold text-gray-900 truncate">
								{swatch.pms} {swatch.series}
							</div>
							<div class="text-[10px] font-mono text-gray-500 mt-0.5">{swatch.hex}</div>
						</div>

						<!-- Copy indicator -->
						{#if copiedHex === swatch.hex}
							<div
								class="absolute inset-0 bg-magenta-600/90 flex items-center justify-center"
								style="animation: fadeIn 150ms ease"
							>
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
