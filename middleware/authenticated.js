export default defineNuxtRouteMiddleware( async () => {
	const { loggedIn } = useAuth()

	//if ( !loggedIn.value ) {
	//	return await navigateTo( '/' )
	//}
} )