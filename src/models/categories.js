import db from './db.js';

// Get all categories
const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        ORDER BY category_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Get one category by its ID
const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get all categories for one service project
const getCategoriesByProjectId = async (id) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM public.category c
        INNER JOIN public.project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get all service projects for one category
const getProjectsByCategoryId = async (id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.pr_location AS location,
            sp.pr_date AS date
        FROM public.serviceproject sp
        INNER JOIN public.project_category pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.pr_date;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};