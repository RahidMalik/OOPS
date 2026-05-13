const express = require("express")
const cors = require("cors");
const MongoDataBaseConnection = require("./src/config/db");

const app = express(express.json());
const PORT = 5000

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...')
    console.error(err.name, err.message)
    process.exit(1)
})

const StartServer = async () => {
    try {
        await MongoDataBaseConnection()

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

        process.on('unhandledRejection', (err) => {
            console.error('UNHANDLED REJECTION! Shutting down...')
            console.error(err.name, err.message)
            server.close(() => {
                process.exit(1)
            })
        });

    } catch (error) {
        console.error('Server start failed:', err.message)
        process.exit(1)
    }
    ;
}

StartServer();
