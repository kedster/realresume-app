/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at https://realresume-app.sethkeddy.workers.dev/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		try {
			const url = new URL(request.url);

			// POST /api/resumes
			if (url.pathname === '/api/resumes' && request.method === 'POST') {
				const data = await request.formData();
				const title = data.get('title');

				// Basic validation example
				if (!title) {
					return new Response(JSON.stringify({ error: 'Missing title' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' },
					});
				}

				// TODO: Save to D1 or handle file upload as needed

				return new Response(JSON.stringify({ message: 'Resume saved' }), {
					status: 201,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// GET /api/resumes/:userId
			const resumesMatch = url.pathname.match(/^\/api\/resumes\/([^/]+)$/);
			if (resumesMatch && request.method === 'GET') {
				const userId = resumesMatch[1];
				// TODO: Fetch resumes for userId from D1
				return new Response(JSON.stringify({ message: `Resumes for user ${userId}` }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Not Found
			return new Response(JSON.stringify({ error: 'Not Found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (err) {
			// Log the error to Cloudflare's console
			console.error('Worker error:', err);

			return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies ExportedHandler<Env>;
