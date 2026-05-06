const mongoose = require("mongoose");

MONGODB_URL = i


async function MongoDataBaseConnection() {
    try {
        // 1. Establish the connection
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connecttion ${conn.connection.host}`)
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}
// 4. Listen for errors AFTER the initial connection is established
// (e.g., if the database server goes offline unexpectedly)
mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDb disconnected")
});
mongoose.connection.on("error", (err) => {
    console.error(`⚠️ MongoDB Error: ${err.message}`);
})

module.exports = MongoDataBaseConnection;