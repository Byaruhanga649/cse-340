import {
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { body, validationResult } from 'express-validator';

// Category validation
const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
        .escape()
];

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

// Display new category form
const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

// Display edit category form
const showEditCategoryForm = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).send('Category not found.');
        }

        const title = 'Edit Category';

        res.render('edit-category', { title, category });

    } catch (error) {
        console.error('EDIT CATEGORY ERROR:', error);
        res.status(500).send('Unable to retrieve category for editing.');
    }
};

// Process new category form
const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    try {
        const { category_name } = req.body;

        const categoryId = await createCategory(category_name);

        req.flash('success', 'Category added successfully!');

        res.redirect(`/category/${categoryId}`);

    } catch (error) {
        console.error('CREATE CATEGORY ERROR:', error);
        req.flash('error', 'Unable to create category.');
        res.redirect('/new-category');
    }
};

// Process edit category form
const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);

    const id = req.params.id;

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-category/' + id);
    }

    try {
        const { category_name } = req.body;

        await updateCategory(id, category_name);

        req.flash('success', 'Category updated successfully!');

        res.redirect(`/category/${id}`);

    } catch (error) {
        console.error('EDIT CATEGORY ERROR:', error);
        req.flash('error', 'Unable to update category.');
        res.redirect('/edit-category/' + id);
    }
};

export {
    showCategoryDetailsPage,
    showNewCategoryForm,
    showEditCategoryForm,
    processNewCategoryForm,
    processEditCategoryForm,
    categoryValidation
};