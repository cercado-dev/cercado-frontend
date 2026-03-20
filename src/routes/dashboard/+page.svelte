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
		<!-- Header -->
		<div class="mb-7">
			<h1 class="text-[28px] font-bold tracking-tight text-gray-900">
				Good morning, <span class="text-magenta-600">{$currentUser?.username}</span>! 👋
			</h1>
			<p class="text-sm text-gray-600 mt-1">
				Here's what's happening with your store today.
			</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-7">
			<a
				href="/products"
				class="group bg-white overflow-hidden rounded-card border border-gray-200 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
				style="box-shadow: var(--shadow-card)"
			>
				<div class="border-t-[3px] border-cyan-500"></div>
				<div class="p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="p-2.5 bg-cyan-50 rounded-lg">
							<svg class="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						</div>
					</div>
					<dt class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Products</dt>
					<dd class="text-2xl font-bold text-gray-900">-</dd>
				</div>
			</a>

			<a
				href="/orders"
				class="group bg-white overflow-hidden rounded-card border border-gray-200 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
				style="box-shadow: var(--shadow-card)"
			>
				<div class="border-t-[3px] border-magenta-500"></div>
				<div class="p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="p-2.5 bg-magenta-50 rounded-lg">
							<svg class="h-5 w-5 text-magenta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
					</div>
					<dt class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Orders</dt>
					<dd class="text-2xl font-bold text-gray-900">-</dd>
				</div>
			</a>

			<a
				href="/stores"
				class="group bg-white overflow-hidden rounded-card border border-gray-200 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
				style="box-shadow: var(--shadow-card)"
			>
				<div class="border-t-[3px] border-yellow-500"></div>
				<div class="p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="p-2.5 bg-yellow-50 rounded-lg">
							<svg class="h-5 w-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
					</div>
					<dt class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Connected Stores</dt>
					<dd class="text-2xl font-bold text-gray-900">-</dd>
				</div>
			</a>

			<div
				class="bg-white overflow-hidden rounded-card border border-gray-200"
				style="box-shadow: var(--shadow-card)"
			>
				<div class="border-t-[3px] border-emerald-500"></div>
				<div class="p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="p-2.5 bg-emerald-50 rounded-lg">
							<svg class="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
					<dt class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Revenue</dt>
					<dd class="text-2xl font-bold text-gray-900">-</dd>
				</div>
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="bg-white rounded-card border border-gray-200 p-6" style="box-shadow: var(--shadow-card)">
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

			<div class="bg-white rounded-card border border-gray-200 p-6" style="box-shadow: var(--shadow-card)">
				<h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
				<div class="space-y-3">
					<a
						href="/orders"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-magenta-50 transition-colors border border-gray-200 group"
					>
						<span class="text-sm font-medium text-gray-700 group-hover:text-magenta-600">Sync Orders</span>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-magenta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="/products"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-magenta-50 transition-colors border border-gray-200 group"
					>
						<span class="text-sm font-medium text-gray-700 group-hover:text-magenta-600">View Products</span>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-magenta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="/stores"
						class="flex items-center justify-between p-3 rounded-lg hover:bg-magenta-50 transition-colors border border-gray-200 group"
					>
						<span class="text-sm font-medium text-gray-700 group-hover:text-magenta-600">Manage Stores</span>
						<svg class="w-5 h-5 text-gray-400 group-hover:text-magenta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
