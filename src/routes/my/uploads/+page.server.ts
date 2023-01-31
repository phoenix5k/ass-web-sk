import { getProfile } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const user_data = await getProfile(event, `sharex_token`);
	const sharex_token = user_data.data.sharex_token;

	console.log(sharex_token);

	const res = await fetch('https://image.phoenixlabs.pics/api/user/self/uploads', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: sharex_token
		}
	});

	const json = await res.json();

	let sortedInput = json
		.slice()
		.sort((a: { date: number }, b: { date: number }) => b.date - a.date);

	return { sortedInput };
}) satisfies PageServerLoad;
