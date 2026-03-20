<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { isAuthenticated } from '$lib/auth';
	import { getAuthorizationUrl } from '$lib/keycloak';

	onMount(() => {
		if ($isAuthenticated) {
			goto('/dashboard');
			return;
		}

		if (browser) {
			const redirectUri = `${window.location.origin}/auth/callback`;
			const state = crypto.randomUUID();
			sessionStorage.setItem('oauth_state', state);

			const authUrl = getAuthorizationUrl(redirectUri, state);
			window.location.href = authUrl;
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
		<p class="mt-4 text-gray-600">Redirecting to login...</p>
	</div>
</div>
