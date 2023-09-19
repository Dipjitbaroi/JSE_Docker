import express from "express";
import pageRoute from "./routes/page.route.js";
import companyinfoRoute from "./routes/companyinfo.route.js";
import usersRoute from "./routes/users.route.js";
import projectsRoute from "./routes/projects.route.js";
import db from "./config/database.js";


const app = express();

app.use(express.json());
app.use(express.static('files'))


app.use("/api", pageRoute, usersRoute, projectsRoute);
app.use("/api/home", pageRoute);
app.use("/api/about", pageRoute);
app.use("/api/services", pageRoute);
app.use("/api/team", pageRoute);
app.use("/api/portfolio", pageRoute);
app.use("/api/company", companyinfoRoute);

db.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully with model definitions.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
