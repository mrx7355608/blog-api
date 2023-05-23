const config = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    clientUrl: process.env.CLIENT_URL,
    nodeEnv: process.env.NODE_ENV,
    sessionSecret: process.env.SESSION_SECRET
}

export default config
