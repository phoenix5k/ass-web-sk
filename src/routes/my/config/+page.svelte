<script lang="ts">
	import type { PageData } from './$types';
	import { Buffer } from 'buffer';

	export let data: PageData;

	const encodeBase64 = (data: string) => {
		return Buffer.from(data).toString('base64');
	};
	const sharex_token = data.user_data.data.sharex_token;

	let sharex_config = {
		Version: '14.1.0',
		Name: 'PhoenixLabs.pics',
		DestinationType: 'ImageUploader, TextUploader, FileUploader',
		RequestMethod: 'POST',
		RequestURL: 'https://image.phoenixlabs.pics/',
		Headers: {
			Authorization: sharex_token
		},
		Body: 'MultipartFormData',
		FileFormName: 'file',
		URL: '{json:.resource}',
		ThumbnailURL: '{json:.thumbnail}',
		DeletionURL: '{json:.delete}',
		ErrorMessage: '{response}'
	};
</script>

<div class="btn-group btn-group-horizontal gap-5">
	<a
		><button
			class="btn btn-secondary"
			on:click={() => {
				navigator.clipboard.writeText(JSON.stringify(sharex_config, null, 2));
			}}>Copy Config to Clipboard</button
		></a
	>
	<a
		download="phoenixlabs.sxcu"
		href="data:application/octet-stream;charset=utf-8;base64,{encodeBase64(
			JSON.stringify(sharex_config, null, 2)
		)}"><button class="btn btn-secondary">Download Config File</button></a
	>
</div>
