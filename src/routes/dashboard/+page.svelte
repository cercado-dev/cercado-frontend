<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated, currentUser } from '$lib/auth';

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});
</script>

{#if $isAuthenticated}
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
			<p class="mt-1 text-sm text-gray-600">Welcome back, {$currentUser?.username}!</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
			<a
				href="/products"
				class="bg-white overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
			>
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 p-3 bg-cyan-100 rounded-lg">
							<svg class="h-6 w-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
								<dd class="text-2xl font-bold text-gray-900">-</dd>
							</dl>
						</div>
					</div>
				</div>
			</a>

			<a
				href="/orders"
				class="bg-white overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
			>
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
							<svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
								<dd class="text-2xl font-bold text-gray-900">-</dd>
							</dl>
						</div>
					</div>
				</div>
			</a>

			<a
				href="/stores"
				class="bg-white overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
			>
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 p-3 bg-pink-100 rounded-lg">
							<svg class="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">Connected Stores</dt>
								<dd class="text-2xl font-bold text-gray-900">-</dd>
							</dl>
						</div>
					</div>
				</div>
			</a>

			<div class="bg-white overflow-hidden rounded-lg border border-gray-200">
				<div class="p-6">
					<div class="flex items-center">
						<div class="flex-shrink-0 p-3 bg-green-100 rounded-lg">
							<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
								<dd class="text-2xl font-bold text-gray-900">-</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="bg-white rounded-lg border border-gray-200 p-6">
				<h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
				<div class="text-center text-gray-500 py-8">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					<p class="mt-2 text-sm">No recent orders</p>
				</div>
			</div>

			<div class="bg-white rounded-lg border border-gray-200 p-6">
				<h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
				<div class="space-y-3">
					<a
						href="/orders"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
					>
						<span class="text-sm font-medium text-gray-700">Sync Orders</span>
						<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="/products"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
					>
						<span class="text-sm font-medium text-gray-700">View Products</span>
						<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="/stores"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
					>
						<span class="text-sm font-medium text-gray-700">Manage Stores</span>
						<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
