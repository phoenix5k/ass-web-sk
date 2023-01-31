import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { ADMIN_TOKEN } from '$env/static/private';
import { getProfile } from '$lib/supabase';
import { generateUsername } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event: any) => {
	const user_profile = await getProfile(event, `active_user`);
	if (user_profile?.data.active_user) {
		throw redirect(302, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const invcode = formData.get('invite_code');

		try {
			const invite = await locals.sb
				.from('invites')
				.select('used, id')
				.eq('code', invcode)
				.single();

			if (invite.error) {
				throw invite.error;
			}

			if (invite.data.used) {
				return {
					formError: 'This invite code has already been used.'
				};
			}

			let username = generateUsername(
				locals.session?.user.user_metadata.full_name.split(' ').join('')
			).toLowerCase();

			try {
				const res = await fetch('https://image.phoenixlabs.pics/api/user', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: ADMIN_TOKEN
					},
					body: JSON.stringify({
						username: username,
						password: 'NOTNEEDED'
					})
				});

				const json = await res.json();

				if (json) {
					// const recorda = await locals.pb
					// 	.collection('users')
					// 	.authWithPassword(data.email, data.password);
					// await locals.pb
					// 	.collection('users')
					// 	.update(recorda.record.id, { sharex_token: json.token });
					// locals.pb.authStore.clear();
					// locals.user = undefined;

					const { error } = await locals.sb
						.from('invites')
						.update({ used: true })
						.eq('id', invite.data.id);

					if (error) {
						throw error;
					} else {
						const { error } = await locals.sb
							.from('users')
							.update({ active_user: true, invite_code_used: invcode, sharex_token: json.token })
							.eq('id', locals.session?.user.id);

						if (error) {
							throw error;
						}

						const location = '/';
						if (browser) return await goto(location);
						else throw redirect(302, location);
					}
				}
			} catch (error) {
				throw error;
			}
		} catch (error) {
			throw error;
		}
	}
};
