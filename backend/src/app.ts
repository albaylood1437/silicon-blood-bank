import querystring from "querystring";
import config from "config";
import cors from "cors";
import express from "express";
import users from "./routes/users";
import bloodtypes from "./routes/bloodtypes";
import donors from "./routes/donors";
import donations from "./routes/donations";
import auth from "./routes/auth";
import patients from "./routes/patients";
import bloodstock from "./routes/bloodstock";
import booking from "./routes/booking";

const app = express();

if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey not defined");
	process.exit(1);
}
// middleware
app.use(express.json());
app.use(cors());
app.use("/users", users);
app.use("/bloodtypes", bloodtypes);
app.use("/donors", donors);
app.use("/donations", donations);
app.use("/patients", patients);
app.use("/bloodstock", bloodstock);
app.use("/booking", booking);
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
