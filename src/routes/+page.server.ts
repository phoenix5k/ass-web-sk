import { getProfile } from '$lib/supabase';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const user_profile = await getProfile(event, `active_user`);

	if (user_profile && user_profile.data.active_user == false) {
		throw redirect(302, '/my/setup');
	}
};

const OAUTH_PROVIDERS = ['discord'];

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Provider not supported.'
				});
			}

			const { data, error } = await locals.sb.auth.signInWithOAuth({
				provider: provider
			});

			if (error) {
				return fail(500, {
					message: 'Server error. Try again later.'
				});
			}

			throw redirect(303, data.url);
		}
	}
};
