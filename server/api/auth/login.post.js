import userModel from '~~/server/models/user.model'
import jwt from 'jsonwebtoken'

export default defineEventHandler( async ( event ) => {
	const { email, password } = await readBody( event )
	const config = useRuntimeConfig()

	//If there are no email and password
	if ( !email || !password ) {
		return {
			statusCode: 400,
			statusMessage: 'Please provide email or password'
		}
	}

	try {
		const user = await userModel.findOne( { email } ).select( '+password' )

		if ( !user || !await user.correctPassword( password, user.password ) ) {
			return {
				statusCode: 401,
				statusMessage: 'Invalid email or password.'
			}
		}
		const token = jwt.sign( { id: user.id }, config.JWT_SECRET )

		setCookie( event, 'authorization', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'none'
		} )
		return {
			token,
			user
		}


	} catch ( error ) {
		console.log( error )
		return {
			statusCode: 500,
			statusMessage: 'Something went wrong.'
		}
	}
} )