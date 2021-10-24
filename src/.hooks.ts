import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ request, resolve }) => {
    const response = await resolve(request)
    return {
        ...response,
        headers: {
            ...response.headers,
            'Cache-Control': 'max-age=7776000'
        }
    }
}