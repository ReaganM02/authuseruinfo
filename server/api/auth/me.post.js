import userModel from '~~/server/models/user.model'
export default defineEventHandler( async ( event ) => {
	const { id } = await readBody( event )

	try {
		const user = await userModel.findById( { _id: id } )
		return user
	} catch ( error ) {
		console.log( error )
	}

} )