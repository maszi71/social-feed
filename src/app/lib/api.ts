export const API_BASE = 'https://686faf3e91e85fac42a2196f.mockapi.io/api/v1';

type ApiFetchOptions = RequestInit & {
  params?: Record<string, string | number>;
  absolute?: boolean;
};

export async function apiFetch<T>(
  endpointOrUrl: string,
  options?: ApiFetchOptions
): Promise<T> {
  const { params, absolute, ...fetchOptions } = options || {};

  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  const url = absolute
    ? endpointOrUrl + queryString
    : `${API_BASE}${endpointOrUrl}${queryString}`;

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
