import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
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

// Display new organization form
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Display edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Process edit organization form
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Individual category details
router.get('/category/:id', showCategoryDetailsPage);

export default router;