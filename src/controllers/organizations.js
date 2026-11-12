import { getOrganizationDetails } from '../models/organizations.js';

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

export { showOrganizationDetailsPage };