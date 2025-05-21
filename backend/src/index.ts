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
		const url = new URL(request.url);

		try {
			// POST /api/resumes
			if (url.pathname === '/api/resumes' && request.method === 'POST') {
				const data = await request.formData();
				const title = data.get('title');

				if (!title || typeof title !== 'string') {
					return new Response(JSON.stringify({ error: "Missing or invalid 'title' field" }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' },
					});
				}

				// Example DB insert — adjust your table/columns accordingly
				await env.DB.prepare('INSERT INTO resumes (title) VALUES (?)').bind(title).run();

				return new Response(JSON.stringify({ message: 'Resume saved' }), {
					status: 201,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// GET /api/resumes/:userId
			const resumesMatch = url.pathname.match(/^\/api\/resumes\/([^/]+)$/);
			if (resumesMatch && request.method === 'GET') {
				const userId = resumesMatch[1];

				// Example DB query — adjust query to fetch resumes by userId
				const result = await env.DB.prepare('SELECT * FROM resumes WHERE user_id = ?').bind(userId).all();

				return new Response(JSON.stringify({ resumes: result.results }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Not Found
			return new Response(JSON.stringify({ error: 'Not Found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			console.error('Worker error:', error);
			return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies ExportedHandler<Env>;
