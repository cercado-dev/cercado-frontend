<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { auth, isAuthenticated, currentUser } from '$lib/auth';
	import { getLogoutUrl } from '$lib/keycloak';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let { children } = $props();

	function handleLogout() {
		if (browser) {
			const redirectUri = window.location.origin;
			auth.logout();
			window.location.href = getLogoutUrl(redirectUri);
		}
	}

	function isActive(path: string) {
		return $page.url.pathname === path || $page.url.pathname.startsWith(path + '/');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cercado</title>
</svelte:head>

{#if $isAuthenticated}
	<!-- Dark sidebar layout -->
	<div class="flex h-screen bg-gray-50">
		<!-- Sidebar -->
		<aside class="w-64 bg-gray-900 text-white flex-shrink-0">
			<div class="flex flex-col h-full">
				<!-- Logo -->
				<div class="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
					<div class="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-sm">C</span>
					</div>
					<span class="text-xl font-semibold">Cercado</span>
				</div>

				<!-- Navigation -->
				<nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
					<a
						href="/dashboard"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors {isActive('/dashboard')
							? 'bg-cyan-500 text-white'
							: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
						<span>Dashboard</span>
					</a>

					<a
						href="/products"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors {isActive('/products')
							? 'bg-cyan-500 text-white'
							: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
						</svg>
						<span>Products</span>
					</a>

					<a
						href="/orders"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors {isActive('/orders')
							? 'bg-cyan-500 text-white'
							: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						<span>Orders</span>
					</a>

					<a
						href="/stores"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors {isActive('/stores')
							? 'bg-cyan-500 text-white'
							: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<span>Stores</span>
					</a>
				</nav>

				<!-- User section -->
				<div class="px-3 py-4 border-t border-gray-800">
					<div class="flex items-center justify-between px-3 py-2">
						<div class="flex items-center gap-3 min-w-0">
							<div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
								<span class="text-xs font-medium">{$currentUser?.username?.[0]?.toUpperCase()}</span>
							</div>
							<span class="text-sm text-gray-300 truncate">{$currentUser?.username}</span>
						</div>
						<button
							onclick={handleLogout}
							class="text-gray-400 hover:text-white transition-colors"
							title="Logout"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</aside>

		<!-- Main content -->
		<main class="flex-1 overflow-auto">
			<div class="p-8">
				{@render children()}
			</div>
		</main>
	</div>
{:else}
	<!-- Public layout (login/home) -->
	<div class="min-h-screen bg-gray-50">
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<a href="/" class="flex items-center gap-2">
							<div class="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
								<span class="text-white font-bold text-sm">C</span>
							</div>
							<span class="text-xl font-bold text-gray-900">Cercado</span>
						</a>
					</div>
					<div class="flex items-center">
						<a href="/login" class="text-sm text-gray-500 hover:text-gray-700">Login</a>
					</div>
				</div>
			</div>
		</nav>

		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			{@render children()}
		</main>
	</div>
{/if}
