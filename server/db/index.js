import mongoose from 'mongoose'
export default async () => {
	try {
		const config = useRuntimeConfig()
		mongoose.set( 'strictQuery', true );
		await mongoose.connect( config.MONGO_URL )
		console.log( 'Successfully connected to DB.' )
	} catch ( error ) {
		console.log( error )
	}
}