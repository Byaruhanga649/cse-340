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

// Get all categories and identify those assigned to one project
const getCategoriesForAssignment = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name,
            CASE
                WHEN pc.project_id IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS assigned
        FROM public.category c
        LEFT JOIN public.project_category pc
            ON c.category_id = pc.category_id
            AND pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

// Assign selected categories to a project
const assignCategoriesToProject = async (projectId, categoryIds) => {
    await db.query(
        'DELETE FROM public.project_category WHERE project_id = $1;',
        [projectId]
    );

    for (const categoryId of categoryIds) {
        await db.query(
            `INSERT INTO public.project_category (project_id, category_id)
             VALUES ($1, $2);`,
            [projectId, categoryId]
        );
    }

    return true;
};

export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    getCategoriesForAssignment,
    assignCategoriesToProject
};