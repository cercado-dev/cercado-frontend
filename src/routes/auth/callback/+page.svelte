<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { auth } from '$lib/auth';
	import { exchangeCodeForToken, parseJwt } from '$lib/keycloak';

	let error = $state('');
	let isLoading = $state(true);

	onMount(async () => {
		if (!browser) return;

		try {
			const params = new URLSearchParams(window.location.search);
			const code = params.get('code');
			const state = params.get('state');
			const storedState = sessionStorage.getItem('oauth_state');

			if (!code) {
				throw new Error('No authorization code received');
			}

			if (state !== storedState) {
				throw new Error('Invalid state parameter');
			}

			sessionStorage.removeItem('oauth_state');

			const redirectUri = `${window.location.origin}/auth/callback`;
			const tokens = await exchangeCodeForToken(code, redirectUri);

			const userInfo = parseJwt(tokens.access_token);
			if (!userInfo) {
				throw new Error('Failed to parse token');
			}

			const user = {
				id: userInfo.sub,
				username: userInfo.preferred_username || userInfo.email,
				email: userInfo.email,
				name: userInfo.name
			};

			auth.login(tokens.access_token, tokens.refresh_token, user);

			goto('/dashboard');
		} catch (err: any) {
			console.error('Authentication error:', err);
			error = err.message || 'Authentication failed';
			isLoading = false;
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		{#if isLoading}
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
			<p class="mt-4 text-gray-600">Completing authentication...</p>
		{:else if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
				<h2 class="text-lg font-semibold text-red-800 mb-2">Authentication Error</h2>
				<p class="text-red-600">{error}</p>
				<a
					href="/login"
					class="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
				>
					Try Again
				</a>
			</div>
		{/if}
	</div>
</div>
