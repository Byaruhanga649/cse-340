import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display upcoming service projects
const showProjectsPage = async (req, res) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

        const title = "Upcoming Service Projects";

        res.render("projects", { title, projects });

    } catch (error) {
        console.error("PROJECTS QUERY ERROR:", error);
        res.status(500).send("Unable to retrieve service projects.");
    }
};

// Display one service project's details
const showProjectDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await getProjectDetails(id);

        if (!project) {
            return res.status(404).send("Service project not found.");
        }

        const title = project.title;

        res.render("project", { title, project });

    } catch (error) {
        console.error("PROJECT DETAILS ERROR:", error);
        res.status(500).send("Unable to retrieve project details.");
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage
};