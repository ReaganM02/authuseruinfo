// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		MONGO_URL: process.env.MONGO_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
		EMAIL_USERNAME: process.env.EMAIl_USERNAME,
		EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
		EMAIL_HOST: process.env.EMAIL_HOST,
		EMAIL_POST: process.env.EMAIL_PORT,
		BUCKET_NAME: process.env.BUCKET_NAME,
		AWS_REGION: process.env.AWS_REGION,
		AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
		AWS_SECRET_KEY: process.env.SECRET_ACCESS_KEY
	},
	nitro: {
		plugins: ["~/server/db/index.js"],
	},
	modules: ['@nuxtjs/tailwindcss']
})
