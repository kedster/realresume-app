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

interface Env {
	DB: D1Database;
}

function withCORS(resp: Response) {
	const newHeaders = new Headers(resp.headers);
	newHeaders.set('Access-Control-Allow-Origin', '*');
	newHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	return new Response(resp.body, {
		status: resp.status,
		headers: newHeaders,
	});
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		// CORS preflight
		if (request.method === 'OPTIONS') {
			return withCORS(new Response(null, { status: 204 }));
		}

		// POST /api/resumes
		if (url.pathname === '/api/resumes' && request.method === 'POST') {
			const { user_id, title, file_blob, status } = await request.json();
			if (!user_id || !title) {
				return withCORS(
					new Response(JSON.stringify({ error: 'Missing user_id or title' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' },
					}),
				);
			}

			// Optionally: store file_blob in R2 or another storage, and set file_url
			// For now, just store file_blob as null or ignore it
			const file_url = null; // Or handle file_blob as needed

			const uploaded_at = new Date().toISOString();
			const result = await env.DB.prepare(
				`INSERT INTO resumes (user_id, title, file_url, status, uploaded_at)
         VALUES (?, ?, ?, ?, ?)`
			)
				.bind(user_id, title, file_url, status || 'active', uploaded_at)
				.run();

			const id = result.meta?.last_row_id?.toString() || 'unknown';
			return withCORS(
				new Response(
					JSON.stringify({
						id,
						user_id,
						title,
						file_url,
						status: status || 'active',
						uploaded_at,
					}),
					{
						status: 201,
						headers: { 'Content-Type': 'application/json' },
					},
				),
			);
		}

		// GET /api/resumes/:userId
		const resumesMatch = url.pathname.match(/^\/api\/resumes\/([^/]+)$/);
		if (resumesMatch && request.method === 'GET') {
			const userId = resumesMatch[1];
			const result = await env.DB.prepare('SELECT * FROM resumes WHERE user_id = ?')
				.bind(userId)
				.all();
			return withCORS(
				new Response(JSON.stringify({ resumes: result.results }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}),
			);
		}

		// Not Found
		return withCORS(
			new Response(JSON.stringify({ error: 'Not Found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			}),
		);
	},
} satisfies ExportedHandler<Env>;
