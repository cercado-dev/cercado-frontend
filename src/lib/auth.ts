import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

interface User {
	id: string;
	username: string;
	email?: string;
	name?: string;
}

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

const initialState: AuthState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	isLoading: true
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	if (browser) {
		const storedToken = localStorage.getItem('access_token');
		const storedUser = localStorage.getItem('user');
		const storedRefresh = localStorage.getItem('refresh_token');

		if (storedToken && storedUser) {
			update((state) => ({
				...state,
				accessToken: storedToken,
				refreshToken: storedRefresh,
				user: JSON.parse(storedUser),
				isAuthenticated: true,
				isLoading: false
			}));
		} else {
			update((state) => ({ ...state, isLoading: false }));
		}
	}

	return {
		subscribe,
		login: (accessToken: string, refreshToken: string, user: User) => {
			if (browser) {
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem('refresh_token', refreshToken);
				localStorage.setItem('user', JSON.stringify(user));
			}
			set({
				user,
				accessToken,
				refreshToken,
				isAuthenticated: true,
				isLoading: false
			});
		},
		logout: () => {
			if (browser) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('user');
			}
			set(initialState);
		},
		updateToken: (accessToken: string) => {
			if (browser) {
				localStorage.setItem('access_token', accessToken);
			}
			update((state) => ({ ...state, accessToken }));
		},
		setLoading: (isLoading: boolean) => {
			update((state) => ({ ...state, isLoading }));
		}
	};
}

export const auth = createAuthStore();
export const isAuthenticated = derived(auth, ($auth) => $auth.isAuthenticated);
export const currentUser = derived(auth, ($auth) => $auth.user);
