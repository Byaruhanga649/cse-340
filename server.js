import 'dotenv/config';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

app.use(express.static(path.join(__dirname, "public")));

// Connect the new routes
app.use(router);

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