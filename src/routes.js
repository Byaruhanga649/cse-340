import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showOrganizationDetailsPage
} from './controllers/organizations.js';

import {
    showCategoryDetailsPage
} from './controllers/categories.js';

const router = express.Router();

// Upcoming service projects
router.get('/projects', showProjectsPage);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Individual organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Individual category details
router.get('/category/:id', showCategoryDetailsPage);

export default router;