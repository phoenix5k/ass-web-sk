import { createClient, getServerSession } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function createProfile(event: any) {}

export async function getProfile(event: any, scope: string) {
	try {
		let supabase_user = await getServerSession(event);

		if (supabase_user) {
			let { data, error, status } = await supabaseClient
				.from('users')
				.select(scope)
				.eq('id', supabase_user.user.id)
				.single();

			if (data == null && error) {
				console.info('User not found in database, creating new profile...');

				const { data, error } = await supabaseClient
					.from('users')
					.insert({
						id: supabase_user.user.id,
						active_user: false,
						invite_code_used: null,
						sharex_token: null
					})
					.select();

				return { data };
			}

			if (error && status !== 406) {
				throw error;
			}

			return { data };
		}
	} catch (error) {
		throw error;
	}
}
