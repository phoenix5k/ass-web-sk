<script lang="ts">
	import '../app.css';
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Nav from '../lib/components/Nav.svelte';

	import type { PageData } from './$types';
	import MiniNav from '$lib/components/MiniNav.svelte';
	import { page } from '$app/stores';
	export let data: PageData;

	$: currentRoute = $page.url.pathname;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	//console.log(data);
</script>

<!-- <div class="bg-gradient-to-tl from-yellow-400 via-red-500 to-pink-500  h-screen">
	<div class="flex flex-col w-screen h-screen">
		<div
			class=" bg-base-200 border-1 border-blue-700  rounded-2xl w-11/12 h-5/6 md:w-9/12 md:h-5/6 overflow-y-auto"
		>
			<Nav />

			<main class="flex-1">
				<slot />
			</main>

			<div class="">
				<Footer />
			</div>
		</div>
	</div>
</div> -->

<div class="bg-gradient-to-tl from-yellow-400 via-red-500 to-pink-500">
	<div class="flex flex-col justify-center items-center min-h-screen">
		<div
			class=" bg-base-200 border-1 border-blue-700  rounded-2xl w-11/12 h-5/6 md:w-9/12 md:h-5/6 overflow-y-auto"
		>
			{#if data.session && data.user_profile && data.user_profile?.data.active_user}<header>
					<Nav
						avatar={data.session.user.user_metadata.picture}
						name={data.session.user.user_metadata.full_name}
					/>
					{#if currentRoute === '/my' || currentRoute == '/my/config'}<MiniNav />{/if}
				</header>{/if}
			<main class="flex justify-center items-center min-h-[433px] max-h-[600px]"><slot /></main>
			<!-- <Footer /> -->
		</div>
	</div>
</div>
