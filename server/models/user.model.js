import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema( {
	name: {
		type: String,
		required: [ true, 'Name is required' ]
	},
	email: {
		type: String,
		required: [ true, 'Email is required' ],
		unique: true,
		lowercase: true,
		validate: [ validator.isEmail, 'Invalid email' ],
		minLength: [ 4, 'Invalid email' ],
		maxLength: [ 30, 'Invalid email' ]
	},
	password: {
		type: String,
		required: [ true, 'Password is required' ],
		minLength: [ 8, 'Password is too short.' ],
		select: false // This will hide the password on the client side
	},
	password_confirm: {
		type: String,
		required: [ true, 'Confirm password is required' ],
		validate: {
			validator: function ( el ) {
				return el === this.password
			},
			message: 'Confirm passwod does not match the password.'
		},
	},
	passwordChangedAt: {
		type: Date,
		select: false
	},
	passwordResetToken: {
		type: String,
		select: false
	},
	passwordResetExpires: {
		type: Date,
		select: false
	},
}, { timestamps: true } )


//Add encryption on password. Encryption will happen between sending and receveiving the data to the database
schema.pre( 'save', async function ( next ) {
	// If the password is not modified, continue encryption
	if ( !this.isModified( 'password' ) ) return next()

	this.password = await bcrypt.hash( this.password, 14 )

	// Delete the confirm password
	this.password_confirm = undefined

	next()
} )

// Compare the user password and the current password. Return true if the password is true otherwise return false
schema.methods.correctPassword = async function ( cadidatePassword, userPassword ) {
	return await bcrypt.compare( cadidatePassword, userPassword )
}

export default mongoose.models.User || mongoose.model( 'User', schema )