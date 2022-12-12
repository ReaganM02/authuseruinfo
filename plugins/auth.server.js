import jwt from 'jsonwebtoken'

export default defineNuxtPlugin( async () => {

	const cookie = useCookie( 'authorization' )
	const config = useRuntimeConfig()
	try {
		const { id } = jwt.verify( cookie.value, config.JWT_SECRET )
		const data = await $fetch( '/api/auth/me', {
			method: 'POST',
			body: { id }
		} )
		useState( 'useUser', () => data )
	} catch ( error ) {

	}
} )