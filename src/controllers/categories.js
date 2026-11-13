import {
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

// Display one category's details
const showCategoryDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).send("Category not found.");
        }

        const projects = await getProjectsByCategoryId(id);

        const title = category.category_name;

        res.render("category", { title, category, projects });

    } catch (error) {
        console.error("CATEGORY DETAILS ERROR:", error);
        res.status(500).send("Unable to retrieve category details.");
    }
};

export { showCategoryDetailsPage };