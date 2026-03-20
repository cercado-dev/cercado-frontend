<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/auth';
	import { storesApi } from '$lib/api';

	let stores = $state<any[]>([]);
	let isLoading = $state(true);
	let error = $state('');
	let searchQuery = $state('');

	onMount(async () => {
		if (!$isAuthenticated) {
			goto('/login');
			return;
		}

		try {
			stores = await storesApi.getAll();
		} catch (err: any) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	const filteredStores = $derived(
		stores.filter(
			(s) =>
				s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.type?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<div>
	<!-- Header -->
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-gray-900">Store Connections</h1>
		<p class="mt-1 text-sm text-gray-600">
			Manage your connected e-commerce stores
		</p>
	</div>

	<!-- Search bar -->
	<div class="mb-6">
		<div class="relative">
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
				placeholder="Search by store name or type..."
				class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-magenta-500 focus:border-magenta-500 sm:text-sm"
			/>
		</div>
		<p class="mt-2 text-sm text-gray-500">
			{filteredStores.length} of {stores.length} stores
		</p>
	</div>

	{#if isLoading}
		<div class="flex justify-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta-600"></div>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<p class="text-red-600">{error}</p>
		</div>
	{:else if filteredStores.length === 0}
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
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No stores found</h3>
			<p class="mt-1 text-sm text-gray-500">
				{searchQuery ? 'Try a different search term' : 'Connect a store to get started'}
			</p>
		</div>
	{:else}
		<!-- Store Cards Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredStores as store}
				<a
					href="/stores/{store.id}"
					class="group bg-white border border-gray-200 rounded-card overflow-hidden transition-all duration-150 hover:-translate-y-0.5"
					style="box-shadow: var(--shadow-card)"
				>
					<!-- Store Icon/Header -->
					<div class="bg-gradient-to-br from-cyan-50 to-magenta-50 p-6 flex items-center justify-center">
						<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
							<svg class="w-8 h-8 text-magenta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
					</div>

					<!-- Store Info -->
					<div class="p-6">
						<div class="flex items-start justify-between mb-3">
							<h3 class="text-lg font-semibold text-gray-900 group-hover:text-magenta-600 transition-colors">
								{store.name}
							</h3>
							<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
								Active
							</span>
						</div>

						<div class="space-y-2 text-sm text-gray-600">
							<div class="flex items-center gap-2">
								<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								<span>{store.type || 'Unknown type'}</span>
							</div>
							{#if store.url}
								<div class="flex items-center gap-2">
									<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
									</svg>
									<span class="truncate">{store.url}</span>
								</div>
							{/if}
						</div>
					</div>

					<!-- Footer -->
					<div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
						<span class="text-sm font-medium text-magenta-600 group-hover:text-magenta-700">
							View details →
						</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
