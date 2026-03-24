// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = 'https://aminul007bd.github.io';
const base = process.env.BASE_PATH ?? '/app-docs';

export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: 'App Docs',
			description: 'Documentation site built with Astro Starlight and deployed to GitHub Pages.',
			disable404Route: true,
			sidebar: [
				{
					label: 'Documentation',
					items: [
						{ label: 'Overview', slug: '' },
						{ label: 'Using the API', slug: 'api-usage' },
						{
							label: 'Endpoints',
							items: [
								{ label: 'Overview', slug: 'endpoints' },
								{ label: 'Donations', slug: 'endpoints/donations' },
								{ label: 'Participants', slug: 'endpoints/participants' },
							],
						},
					],
				},
			],
		}),
	],
});
