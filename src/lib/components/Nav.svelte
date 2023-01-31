<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import NavItem from './NavItem.svelte';

	export let avatar: string;
	export let name: string;

	$: currentRoute = $page.url.pathname;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<div class="navbar">
	<div class="flex-1">
		<div class="avatar">
			<div class="w-16 h-16 rounded-full">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={avatar} />
			</div>
		</div>
		<!-- <span class="ml-5">{name}</span> -->
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn btn-sm btn-ghost">Logout</button>
		</form>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<NavItem item="/" route={currentRoute} title="Home" />
			<!-- <NavItem item="/my/config" route={currentRoute} title="ShareX Config" />
			<NavItem item="/my/uploads" route={currentRoute} title="My Uploads" /> -->

			<!-- doing it this way until I figure out lol -->
			<li>
				<a
					href="/my"
					class={currentRoute === '/my' || currentRoute === '/my/config' ? 'active' : ''}>Profile</a
				>
			</li>

			<NavItem item="/my/uploads" route={currentRoute} title="My Uploads" />
		</ul>
	</div>
</div>
