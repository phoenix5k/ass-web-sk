<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import type { PageData } from './$types';
	export let data: PageData;

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faDiscord } from '@fortawesome/free-brands-svg-icons';
	import { redirect } from '@sveltejs/kit';
	import MainPage from '$lib/components/MainPage.svelte';

	const signInWithDiscord = async () => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'discord'
		});
		if (error) {
			console.log(error);
		}
	};
</script>

{#if data.session}<MainPage />{:else}
	<form method="POST" use:enhance={signInWithDiscord} class="socials">
		<!-- <button formaction="?/login&provider=discord" class="btn btn-ghost">Discord</button> -->
		<button
			formaction="?/login&provider=discord"
			class="btn btn-l btn-outline rounded-md text-xl font-semibold gap-2"
		>
			<Fa icon={faDiscord} />
			Login with Discord
		</button>
	</form>
{/if}
