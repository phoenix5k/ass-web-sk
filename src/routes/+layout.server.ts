import { getProfile } from '$lib/supabase';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	console.log('Ran layout load');

	let session = await getServerSession(event);
	let user_profile = await getProfile(event, `active_user`);

	return {
		session: session,
		user_profile: user_profile
	};
};
