
const app = require("./src");
require("dotenv").config();

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
    console.log("server running on port ${PORT}");
}) 

