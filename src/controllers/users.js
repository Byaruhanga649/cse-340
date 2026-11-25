import bcrypt from 'bcrypt';
import {
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

// Displays the registration form.
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Processes user registration.
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

// Displays the login form.
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

// Processes user login.
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);

        if (user) {
            req.session.user = user;

            req.flash('success', 'You are now logged in.');

            if (res.locals.NODE_ENV === 'development') {
                console.log(`User ${user.email} logged in.`);
            }

            return res.redirect('/dashboard');
        }

        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');

    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        return res.redirect('/login');
    }
};

// Processes user logout.
const processLogout = (req, res) => {
    delete req.session.user;

    req.flash('success', 'You have been logged out.');

    res.redirect('/login');
};

// Middleware to protect routes.
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }

    next();
};

// Middleware to protect routes based on user role.
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        next();
    };
};

// Displays the user dashboard.
const showDashboard = (req, res) => {
    const user = req.session.user;

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};

// Displays all registered users (admin only).
const showUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.render('users', {
            title: 'Registered Users',
            users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        req.flash('error', 'Unable to retrieve users.');
        res.redirect('/dashboard');
    }
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsers
};