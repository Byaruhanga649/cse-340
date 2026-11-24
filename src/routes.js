import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    projectValidation
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
    showCategoryDetailsPage,
    showNewCategoryForm,
    showEditCategoryForm,
    processNewCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard
} from './controllers/users.js';

const router = express.Router();

// Upcoming service projects
router.get('/projects', showProjectsPage);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Display new project form
router.get('/new-project', showNewProjectForm);

// Process new project form with validation
router.post('/new-project', projectValidation, processNewProjectForm);

// Display edit project form
router.get('/edit-project/:id', showEditProjectForm);

// Process edit project form
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Display category assignment form
router.get('/project/:id/assign-categories', showAssignCategoriesForm);

// Process category assignment form
router.post('/project/:id/assign-categories', processAssignCategoriesForm);

// Individual organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Display new organization form
router.get('/new-organization', showNewOrganizationForm);

// Process new organization form
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Display edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Process edit organization form
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Display new category form
router.get('/new-category', showNewCategoryForm);

// Process new category form
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Display edit category form
router.get('/edit-category/:id', showEditCategoryForm);

// Process edit category form
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Individual category details
router.get('/category/:id', showCategoryDetailsPage);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login and logout routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

export default router;