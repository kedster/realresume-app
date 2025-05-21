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
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// POST /api/resumes
		if (url.pathname === '/api/resumes' && request.method === 'POST') {
			// Example: parse JSON body and save to D1
			const data = await request.formData();
			const title = data.get('title');
			// You'd also handle file upload here if needed (see Cloudflare docs for file handling)
			// Example: Save to D1 (pseudo-code)
			// await env.DB.prepare('INSERT INTO resumes (title) VALUES (?)').bind(title).run();
			return new Response(JSON.stringify({ message: 'Resume saved' }), { status: 201 });
		}

		// GET /api/resumes/:userId
		const resumesMatch = url.pathname.match(/^\/api\/resumes\/([^/]+)$/);
		if (resumesMatch && request.method === 'GET') {
			const userId = resumesMatch[1];
			// Example: Fetch from D1
			// const { results } = await env.DB.prepare('SELECT * FROM resumes WHERE user_id = ?').bind(userId).all();
			return new Response(JSON.stringify({ message: `Resumes for user ${userId}` }), { status: 200 });
		}

		// Default: Not Found
		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
