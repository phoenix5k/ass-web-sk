import { getProfile } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const user_data = await getProfile(event, `sharex_token`);
	return { user_data };
}) satisfies PageServerLoad;
