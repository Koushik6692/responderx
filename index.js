const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/connectDB");

// * controllers
const userController = require("./controllers/userController");
const reportController = require("./controllers/reportController");
const resourceController = require("./controllers/resourceController");
const statsController = require("./controllers/statController");

const app = express();

// Use the environment's PORT, or fallback to 3000 if not set
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Set the frontend folder as the static folder
app.use(express.static(path.join(__dirname, "./frontend")));

// Serve index.html on the / endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/landing.html"));
});

// Additional routes...
// (Your other routes here)

// Backend routes
app.use("/api/users", userController);
app.use("/api/reports", reportController);
app.use("/api/resources", resourceController);
app.use("/api/stats", statsController);

app.listen(port, () => {
  console.log(`ResponderX listening at http://localhost:${port}`);
});
