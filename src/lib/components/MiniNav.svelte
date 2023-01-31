<script>
	import { page } from '$app/stores';
	import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	$: currentRoute = $page.url.pathname;
</script>

<div class="flex justify-center">
	<ul class="menu menu-horizontal bg-base-100 rounded-box">
		<li>
			<a href="/my" class={currentRoute === '/my' ? 'active' : ''}><Fa icon={faUser} /> Profile</a>
		</li>
		<li>
			<a href="/my/config" class={currentRoute === '/my/config' ? 'active' : ''}
				><Fa icon={faKey} /> ShareX Config</a
			>
		</li>
	</ul>
</div>
