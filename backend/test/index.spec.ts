import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('RealResume Worker API', () => {
	describe('GET /message', () => {
		it('responds with "Hello, World!"', async () => {
			const request = new Request('http://example.com/message');
			const response = await worker.fetch(request, env, createExecutionContext());
			expect(await response.text()).toMatchInlineSnapshot(`"Hello, World!"`);
		});
	});

	describe('POST /api/auth/login', () => {
		it('responds with login result', async () => {
			const request = new Request('http://example.com/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: 'user1', password: 'pass123' }),
			});
			const response = await worker.fetch(request, env, createExecutionContext());
			expect(response.status).toBe(200);
			const json = await response.json();
			expect(json).toHaveProperty('message');
		});
	});

	describe('POST /api/auth/google', () => {
		it('responds with google auth result', async () => {
			const request = new Request('http://example.com/api/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: 'fake-google-token' }),
			});
			const response = await worker.fetch(request, env, createExecutionContext());
			expect([200, 401]).toContain(response.status); // Accepts either success or unauthorized
		});
	});

	describe('POST /api/resumes', () => {
		it('responds with resume saved', async () => {
			const formData = new FormData();
			formData.append('title', 'Test Resume');
			const request = new Request('http://example.com/api/resumes', {
				method: 'POST',
				body: formData,
			});
			const response = await worker.fetch(request, env, createExecutionContext());
			expect(response.status).toBe(201);
			const json = await response.json();
			expect(json).toHaveProperty('message');
		});
	});

	describe('GET /api/resumes/:userId', () => {
		it('responds with resumes for user', async () => {
			const userId = '1';
			const request = new Request(`http://example.com/api/resumes/${userId}`);
			const response = await worker.fetch(request, env, createExecutionContext());
			expect([200, 404]).toContain(response.status);
		});
	});
});
