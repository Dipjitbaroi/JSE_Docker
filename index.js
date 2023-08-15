import express from "express";
import pageRoute from "./routes/page.route.js";
import companyinfoRoute from "./routes/companyinfo.route.js";
import usersRoute from "./routes/users.route.js";
import projectsRoute from "./routes/projects.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", pageRoute, usersRoute, projectsRoute);
app.use("/api/home", pageRoute);
app.use("/api/about", pageRoute);
app.use("/api/services", pageRoute);
app.use("/api/team", pageRoute);
app.use("/api/portfolio", pageRoute);
app.use("/api/company", companyinfoRoute);
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
