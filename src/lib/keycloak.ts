import { env } from '$env/dynamic/public';

export interface KeycloakConfig {
	url: string;
	realm: string;
	clientId: string;
}

export function getKeycloakConfig(): KeycloakConfig {
	return {
		url: env.PUBLIC_KEYCLOAK_URL || '',
		realm: env.PUBLIC_KEYCLOAK_REALM || '',
		clientId: env.PUBLIC_KEYCLOAK_CLIENT_ID || ''
	};
}

export function getAuthorizationUrl(redirectUri: string, state: string): string {
	const config = getKeycloakConfig();
	const params = new URLSearchParams({
		client_id: config.clientId,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'openid profile email',
		state
	});

	return `${config.url}/realms/${config.realm}/protocol/openid-connect/auth?${params}`;
}

export function getLogoutUrl(redirectUri: string): string {
	const config = getKeycloakConfig();
	const params = new URLSearchParams({
		client_id: config.clientId,
		post_logout_redirect_uri: redirectUri
	});

	return `${config.url}/realms/${config.realm}/protocol/openid-connect/logout?${params}`;
}

export async function exchangeCodeForToken(code: string, redirectUri: string): Promise<any> {
	const config = getKeycloakConfig();
	const tokenUrl = `${config.url}/realms/${config.realm}/protocol/openid-connect/token`;

	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		client_id: config.clientId,
		code,
		redirect_uri: redirectUri
	});

	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	if (!response.ok) {
		throw new Error('Failed to exchange code for token');
	}

	return response.json();
}

export async function refreshAccessToken(refreshToken: string): Promise<any> {
	const config = getKeycloakConfig();
	const tokenUrl = `${config.url}/realms/${config.realm}/protocol/openid-connect/token`;

	const body = new URLSearchParams({
		grant_type: 'refresh_token',
		client_id: config.clientId,
		refresh_token: refreshToken
	});

	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	if (!response.ok) {
		throw new Error('Failed to refresh token');
	}

	return response.json();
}

export function parseJwt(token: string) {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		return null;
	}
}
