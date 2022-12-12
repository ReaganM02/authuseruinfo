
import jwt from 'jsonwebtoken'
import userModel from '~~/server/models/user.model'
export default defineEventHandler( async ( event ) => {
	const authorization = getCookie( event, 'authorization' )
	const config = useRuntimeConfig()
	try {
		if ( !authorization ) {
			return {
				statusMessage: 'unauthorize'
			}
		}

		const { id } = await jwt.verify( authorization, config.JWT_SECRET )

		const user = await userModel.findById( { _id: id } )

		return {
			statusCode: 200,
			data: user
		}


	} catch ( error ) {
		return {
			statusMessage: 'unauthorize'
		}
	}
} )