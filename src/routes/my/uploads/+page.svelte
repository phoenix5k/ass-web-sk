<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import Time from 'svelte-time';
	import { faClosedCaptioning, faHamburger } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
</script>

<div class="p-4 container grid grid-cols-4 gap-4 mx-auto max-h-[400px]">
	{#each data.sortedInput as item}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div class="w-full rounded max-w-[180px] max-h-[180px] dropdown">
			<figure><img src={item.url} alt="lll" class="h-[180px] w-[180px]" /></figure>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label tabindex="0" class="absolute top-0 m-5 btn btn-circle bg-opacity-70">
				<Fa icon={faClosedCaptioning} />
			</label>

			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="text-primary dropdown-content menu absolute top-0 bg-opacity-80 p-2 mt-14 ml-14 w-45 rounded-2xl bg-gray-800"
			>
				<li class="">
					<a href={item.url} target="_blank" rel="noreferrer">Direct URL</a>
				</li>
				<li><label for="remove-modal" tag="a">Remove</label></li>
			</ul>
		</div>
	{/each}
</div>

<input type="checkbox" id="remove-modal" class="modal-toggle" />
<label for="remove-modal" class="modal cursor-pointer rounded-2xl">
	<label class="modal-box relative" for="">
		<h3 class="text-lg font-bold">Welp...</h3>
		<p class="py-4">
			This functionality isn't added yet. I'm sorry. Remove the image from your ShareX Client.
		</p>
	</label>
</label>
