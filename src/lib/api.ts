import { env } from '$env/dynamic/public';
import { auth } from './auth';
import { get } from 'svelte/store';

const API_BASE_URL = env.PUBLIC_API_URL || 'http://localhost:8765';

interface RequestOptions extends RequestInit {
	requireAuth?: boolean;
}

async function request<T>(
	endpoint: string,
	options: RequestOptions = {}
): Promise<T> {
	const { requireAuth = true, ...fetchOptions } = options;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...fetchOptions.headers
	};

	if (requireAuth) {
		const authState = get(auth);
		if (authState.accessToken) {
			headers['Authorization'] = `Bearer ${authState.accessToken}`;
		}
	}

	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		...fetchOptions,
		headers
	});

	if (!response.ok) {
		if (response.status === 401) {
			auth.logout();
			throw new Error('Unauthorized - please login again');
		}
		const error = await response.json().catch(() => ({ message: 'An error occurred' }));
		throw new Error(error.message || `Request failed with status ${response.status}`);
	}

	if (response.status === 204) {
		return {} as T;
	}

	return response.json();
}

export const api = {
	get: <T>(endpoint: string, options?: RequestOptions) =>
		request<T>(endpoint, { ...options, method: 'GET' }),

	post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
		request<T>(endpoint, {
			...options,
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined
		}),

	put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
		request<T>(endpoint, {
			...options,
			method: 'PUT',
			body: data ? JSON.stringify(data) : undefined
		}),

	patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
		request<T>(endpoint, {
			...options,
			method: 'PATCH',
			body: data ? JSON.stringify(data) : undefined
		}),

	delete: <T>(endpoint: string, options?: RequestOptions) =>
		request<T>(endpoint, { ...options, method: 'DELETE' })
};

// Example API endpoints based on your API structure
export const productsApi = {
	getAll: () => api.get<any[]>('/api/products'),
	getById: (id: string) => api.get<any>(`/api/products/${id}`),
	create: (data: any) => api.post<any>('/api/products', data),
	update: (id: string, data: any) => api.put<any>(`/api/products/${id}`, data),
	delete: (id: string) => api.delete(`/api/products/${id}`)
};

export const ordersApi = {
	getAll: () => api.get<any[]>('/api/orders'),
	getById: (id: string) => api.get<any>(`/api/orders/${id}`),
	sync: () => api.post('/api/orders/sync')
};

export const storesApi = {
	getAll: () => api.get<any[]>('/api/stores'),
	getById: (id: string) => api.get<any>(`/api/stores/${id}`)
};
