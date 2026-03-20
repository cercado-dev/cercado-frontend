<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/auth';
	import { productsApi } from '$lib/api';

	let products = $state<any[]>([]);
	let isLoading = $state(true);
	let error = $state('');
	let searchQuery = $state('');

	onMount(async () => {
		if (!$isAuthenticated) {
			goto('/login');
			return;
		}

		try {
			products = await productsApi.getAll();
		} catch (err: any) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	const filteredProducts = $derived(
		products.filter(
			(p) =>
				p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<div>
	<!-- Header -->
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-gray-900">Product Library</h1>
		<p class="mt-1 text-sm text-gray-600">
			Browse products — click any product to view details
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
				placeholder="Search by name or SKU..."
				class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
			/>
		</div>
		<p class="mt-2 text-sm text-gray-500">
			{filteredProducts.length} of {products.length} products
		</p>
	</div>

	{#if isLoading}
		<div class="flex justify-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<p class="text-red-600">{error}</p>
		</div>
	{:else if filteredProducts.length === 0}
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
					d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
			<p class="mt-1 text-sm text-gray-500">
				{searchQuery ? 'Try a different search term' : 'Get started by creating a new product'}
			</p>
		</div>
	{:else}
		<!-- Product Grid -->
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
			{#each filteredProducts as product}
				<a
					href="/products/{product.id}"
					class="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
				>
					<!-- Product Image/Placeholder -->
					<div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
						{#if product.imageUrl}
							<img src={product.imageUrl} alt={product.name} class="w-full h-full object-cover" />
						{:else}
							<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						{/if}
					</div>
					<!-- Product Info -->
					<div class="p-3">
						<h3 class="font-medium text-sm text-gray-900 truncate group-hover:text-cyan-600 transition-colors">
							{product.name}
						</h3>
						<p class="text-xs text-gray-500 mt-1">
							{product.sku || 'No SKU'}
						</p>
						{#if product.price}
							<p class="text-sm font-semibold text-gray-900 mt-1">
								${product.price}
							</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
