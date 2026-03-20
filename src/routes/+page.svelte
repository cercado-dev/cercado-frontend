<script lang="ts">
	import { isAuthenticated, currentUser } from '$lib/auth';
</script>

<div class="px-4 py-12 sm:px-6 lg:px-8">
	<div class="text-center">
		<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
			Welcome to Cercado
		</h1>
		<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
			Your complete e-commerce management platform
		</p>

		{#if $isAuthenticated}
			<div class="mt-8">
				<p class="text-lg text-gray-700">
					Hello, {$currentUser?.username || 'User'}!
				</p>
				<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
					<a
						href="/dashboard"
						class="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg text-white bg-magenta-600 hover:bg-magenta-700 transition-all duration-150 hover:-translate-y-0.5 md:py-4 md:text-lg md:px-10"
						style="box-shadow: 0 1px 3px rgba(230, 0, 126, 0.3)"
					>
						Go to Dashboard
					</a>
				</div>
			</div>
		{:else}
			<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
				<a
					href="/login"
					class="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg text-white bg-magenta-600 hover:bg-magenta-700 transition-all duration-150 hover:-translate-y-0.5 md:py-4 md:text-lg md:px-10"
					style="box-shadow: 0 1px 3px rgba(230, 0, 126, 0.3)"
				>
					Get Started
				</a>
			</div>
		{/if}
	</div>
</div>
