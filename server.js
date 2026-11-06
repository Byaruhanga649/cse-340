import 'dotenv/config';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';
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

app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();

        console.log("Projects retrieved:", projects);

        const title = "Service Projects";
        res.render("projects", { title, projects });

    } catch (error) {
        console.error("PROJECTS QUERY ERROR:", error);

        res.status(500).send("Unable to retrieve service projects.");
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();

        console.log("Categories retrieved:", categories);

        const title = "Service Project Categories";
        res.render("categories", { title, categories });

    } catch (error) {
        console.error("CATEGORIES QUERY ERROR:", error);

        res.status(500).send("Unable to retrieve categories.");
    }
});

app.listen(port, async () => {
    try {
        await testConnection();

        console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});