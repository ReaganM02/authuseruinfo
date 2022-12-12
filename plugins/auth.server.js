import jwt from 'jsonwebtoken'
import userModel from '~~/server/models/user.model'

export default defineNuxtPlugin( async () => {

	const cookie = useCookie( 'authorization' )
	const config = useRuntimeConfig()
	try {
		const { id } = jwt.verify( cookie.value, config.JWT_SECRET )
		const user = await userModel.findById( { _id: id } )
		useState( 'useUser', () => user )
	} catch ( error ) {

	}
} )