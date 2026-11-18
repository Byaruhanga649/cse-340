import {
    getUpcomingProjects,
    getProjectDetails,
    createProject
} from '../models/projects.js';

import {
    getCategoriesByProjectId
} from '../models/categories.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define validation and sanitization rules
const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Project description cannot exceed 1000 characters')
        .escape(),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 200 })
        .withMessage('Project location cannot exceed 200 characters')
        .escape(),

    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isDate()
        .withMessage('Please provide a valid project date'),

    body('organizationId')
        .notEmpty()
        .withMessage('Please select an organization')
        .isInt()
        .withMessage('Please select a valid organization')
];

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

        const categories = await getCategoriesByProjectId(id);

        const title = project.title;

        res.render("project", { title, project, categories });

    } catch (error) {
        console.error("PROJECT DETAILS ERROR:", error);
        res.status(500).send("Unable to retrieve project details.");
    }
};

// Display the new project form
const showNewProjectForm = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        const title = 'Add New Service Project';

        res.render('new-project', { title, organizations });

    } catch (error) {
        console.error('NEW PROJECT FORM ERROR:', error);
        res.status(500).send('Unable to load the new project form.');
    }
};

// Process the new project form
const processNewProjectForm = async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    try {
        const { title, description, location, date, organizationId } = req.body;

        const projectId = await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'Service project added successfully!');

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        console.error('NEW PROJECT ERROR:', error);
        req.flash('error', 'Unable to add service project.');
        res.redirect('/new-project');
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
};