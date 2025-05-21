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

interface Env {
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		try {
			const url = new URL(request.url);

			// Handle preflight OPTIONS
			if (request.method === 'OPTIONS') {
				return withCORS(new Response(null, { status: 204 }));
			}

			// GET /message
			if (url.pathname === '/message' && request.method === 'GET') {
				return new Response('Hello, World!', {
					status: 200,
					headers: { 'Content-Type': 'text/plain' },
				});
			}

			// GET /random
			if (url.pathname === '/random' && request.method === 'GET') {
				return new Response(crypto.randomUUID(), {
					status: 200,
					headers: { 'Content-Type': 'text/plain' },
				});
			}

			// POST /api/auth/login
			if (url.pathname === '/api/auth/login' && request.method === 'POST') {
				const { username, password } = await request.json() as { username: string; password: string };
				// Demo logic
				if (username === 'user1' && password === 'pass123') {
					return new Response(JSON.stringify({ message: 'Login successful', userId: '1' }), {
						status: 200,
						headers: { 'Content-Type': 'application/json' },
					});
				}
				return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
					status: 401,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// POST /api/auth/google
			if (url.pathname === '/api/auth/google' && request.method === 'POST') {
				// For demo, just return a fake token
				return new Response(JSON.stringify({ user: 'demo@google.com', token: 'example-jwt-or-session' }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// POST /api/resumes
			if (url.pathname === '/api/resumes' && request.method === 'POST') {
				const data = await request.json() as { user_id: string; title: string; file_url?: string; status?: string };
				const { user_id, title, file_url, status } = data;

				if (!user_id || !title) {
					return withCORS(
						new Response(JSON.stringify({ error: 'Missing user_id or title' }), {
							status: 400,
							headers: { 'Content-Type': 'application/json' },
						}),
					);
				}

				const uploaded_at = new Date().toISOString();

				// Insert into D1
				const result = await env.DB.prepare(
					`INSERT INTO resumes (user_id, title, file_url, status, uploaded_at)
         VALUES (?, ?, ?, ?, ?)`
				)
					.bind(user_id, title, file_url || null, status || 'active', uploaded_at)
					.run();

				const id = result.meta?.last_row_id?.toString() || 'unknown';

				return withCORS(
					new Response(
						JSON.stringify({
							id,
							user_id,
							title,
							file_url: file_url || null,
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
				return new Response(JSON.stringify({ message: `Resumes for user ${userId}` }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Not Found
			return withCORS(
				new Response(JSON.stringify({ error: 'Not Found' }), {
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}),
			);
		} catch (err) {
			// Log the error to Cloudflare's console
			console.error('Worker error:', err);

			return withCORS(
				new Response(JSON.stringify({ error: 'Internal Server Error' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}),
			);
		}
	},
} satisfies ExportedHandler<Env>;
