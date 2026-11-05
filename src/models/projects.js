import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            serviceproject.project_id,
            serviceproject.organization_id,
            serviceproject.title,
            serviceproject.description,
            serviceproject.pr_location,
            serviceproject.pr_date,
            organization.name AS organization_name
        FROM public.serviceproject
        INNER JOIN public.organization
        ON serviceproject.organization_id = organization.organization_id
        ORDER BY serviceproject.pr_date;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };