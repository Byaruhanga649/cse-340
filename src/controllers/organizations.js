import {
    getOrganizationDetails,
    createOrganization
} from '../models/organizations.js';

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

// Process the new organization form
const processNewOrganizationForm = async (req, res) => {
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

export {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
};