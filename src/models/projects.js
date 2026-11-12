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

// Get the next upcoming service projects
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.pr_date AS date,
            p.pr_location AS location,
            p.organization_id,
            o.name AS organization_name
        FROM public.serviceproject p
        JOIN public.organization o
            ON p.organization_id = o.organization_id
        WHERE p.pr_date >= CURRENT_DATE
        ORDER BY p.pr_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get details of one service project
const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.pr_date AS date,
            p.pr_location AS location,
            p.organization_id,
            o.name AS organization_name
        FROM public.serviceproject p
        JOIN public.organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

export {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails
};