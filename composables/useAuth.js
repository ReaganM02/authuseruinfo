export default () => {
	const useAuthToken = () => useState( 'authToken' )
	const useAuthUser = () => useState( 'authUser' )
	const loggedIn = useState( 'loggedIn', () => false )

	const setToken = ( newToken ) => {
		const authToken = useAuthToken()
		authToken.value = newToken
	}

	const setUser = ( newUser ) => {
		const authUser = useAuthUser()
		authUser.value = newUser
	}

	const login = ( { email, password } ) => {
		return new Promise( async ( resolve, reject ) => {
			try {
				const data = await $fetch( '/api/auth/login', {
					method: 'POST',
					body: { email, password }
				} )

				setToken( data.token )
				setUser( data.user )
				loggedIn.value = true
				resolve( true )
				console.log( data )
			} catch ( error ) {
				reject( error )
			}
		} )
	}
	const me = async () => {
		try {
			const data = await $fetch( '/api/auth/me' )

			if ( data.statusCode === 200 ) {
				setUser( data.data )
				return loggedIn.value = true
			}
			return loggedIn.value = false
		} catch ( error ) {
			loggedIn.value = false
			console.log( error )

		}
	}
	return {
		login,
		useAuthUser,
		me,
		loggedIn
	}
}