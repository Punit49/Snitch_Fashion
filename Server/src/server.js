import app from "./app/app.js";
import connectDB from "./config/db.js";
import config from "./config/dotenv.config.js";

await connectDB();

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on Port -", PORT);
}) 