<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form method="POST" use:enhance action="?invcode" class="flex flex-col">
	<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Invite Code</label
	>
	<input
		type="text"
		name="invite_code"
		aria-describedby="helper-text-explanation"
		class="input input-bordered rounded-2xl block w-full p-2.5 "
		placeholder="NOIR2023"
	/>
	<p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
		You need an invite code to make an account.
	</p>
	<button type="submit" class="mt-4 btn btn-sm btn-primary rounded-md text-xl font-semibold gap-2">
		Continue
	</button>

	{#if form?.formError}
		<div class="alert alert-error shadow-lg mt-4">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{form?.formError}</span>
			</div>
		</div>
	{/if}
</form>
