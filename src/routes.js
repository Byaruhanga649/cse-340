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
    requireRole,
    showDashboard
} from './controllers/users.js';

const router = express.Router();

// Upcoming service projects
router.get('/projects', showProjectsPage);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Display new project form - Admin only
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Process new project form - Admin only
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Display edit project form - Admin only
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Process edit project form - Admin only
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Display category assignment form - Admin only
router.get('/project/:id/assign-categories', requireRole('admin'), showAssignCategoriesForm);

// Process category assignment form - Admin only
router.post('/project/:id/assign-categories', requireRole('admin'), processAssignCategoriesForm);

// Individual organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Display new organization form - Admin only
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Process new organization form - Admin only
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Display edit organization form - Admin only
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Process edit organization form - Admin only
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Display new category form - Admin only
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

// Process new category form - Admin only
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// Display edit category form - Admin only
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// Process edit category form - Admin only
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

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
