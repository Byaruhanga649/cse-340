import 'dotenv/config';
import { getAllOrganizations } from './src/models/organizations.js';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        console.log("Organizations retrieved:", organizations);

        const title = "Our Partner Organizations";
        res.render("organizations", { title, organizations });

    } catch (error) {
        console.error("ORGANIZATIONS QUERY ERROR:", error);
        console.error("CONNECTION DETAILS:", error.errors);

        res.status(500).send("Unable to retrieve organizations.");
    }
});

app.get("/projects", (req, res) => {
    res.render("projects", { title: "Service Projects" });
});

app.get("/categories", (req, res) => {
    res.render("categories", { title: "Categories" });
});

app.listen(port, async () => {
    try {
        await testConnection();

        console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});