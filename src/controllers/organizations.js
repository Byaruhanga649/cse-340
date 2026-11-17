import {
    getOrganizationDetails,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters')
        .escape(),

    body('contactEmail')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

// Display one organization's details
const showOrganizationDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;

        const organization = await getOrganizationDetails(id);

        if (!organization) {
            return res.status(404).send("Organization not found.");
        }

        const title = organization.name;

        res.render("organization", { title, organization });

    } catch (error) {
        console.error("ORGANIZATION DETAILS ERROR:", error);
        res.status(500).send("Unable to retrieve organization details.");
    }
};

// Display the new organization form
const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

// Display the edit organization form
const showEditOrganizationForm = async (req, res) => {
    try {
        const organizationId = req.params.id;

        const organizationDetails = await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            return res.status(404).send('Organization not found.');
        }

        const title = 'Edit Organization';

        res.render('edit-organization', { title, organizationDetails });

    } catch (error) {
        console.error('EDIT ORGANIZATION ERROR:', error);
        res.status(500).send('Unable to retrieve organization for editing.');
    }
};

// Process the new organization form
const processNewOrganizationForm = async (req, res) => {

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;

    const logoFilename = 'placeholder-logo.png';

    const organizationId = await createOrganization(
        name,
        description,
        contactEmail,
        logoFilename
    );

    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};

// Process the edit organization form
const processEditOrganizationForm = async (req, res) => {

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-organization/' + req.params.id);
    }

    const organizationId = req.params.id;

    const { name, description, contactEmail, logoFilename } = req.body;

    await updateOrganization(
        organizationId,
        name,
        description,
        contactEmail,
        logoFilename
    );

    req.flash('success', 'Organization updated successfully!');

    res.redirect(`/organization/${organizationId}`);
};

export {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    showEditOrganizationForm,
    processNewOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
};