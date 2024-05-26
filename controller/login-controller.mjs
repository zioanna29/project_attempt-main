import bcrypt from 'bcrypt'

import * as userModel from "../model/local-championship-model.mjs"

export let showLogInForm = function (req, res) {
    res.render('./login.ejs', { model: process.env.MODEL });
}

export let showRegisterForm = function (req, res) {
    res.render('register-password', {});
}

export let doRegister = async function (req, res) {
    try {
        const registrationResult = await userModel.registerUser(req.body.username, req.body.password);
        if (registrationResult.message) {
            res.render('register-password', { message: registrationResult.message })
        }
        else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('registration error: ' + error);
        next(error);
    }
}

export let doLogin = async function (req, res) {
    const user = await userModel.getUserByUsername(req.body.username);
    if (user == undefined || !user.password_hash || !user.id) {
        res.render('login');
    }
    else {
        const match = await bcrypt.compare(req.body.password, user.password_hash);

        if (req.body.password === user.password_hash) {
            const userId = req.session.loggedUserId;
            req.session.loggedUserId = user.id;
            const redirectTo = req.session.originalUrl || "/admin/anakoinwsh/addAnakoinwsh";

            res.redirect(redirectTo);
        }
        else {
            res.render("login", { message: 'Ο κωδικός πρόσβασης είναι λάθος' })
        }
    }
}

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export let checkAuthenticated = function (req, res, next) {
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        next();
    }
    else {
        if ((req.originalUrl === "/login") || (req.originalUrl === "/register")) {
            next()
        }
        else {
            console.log("not authenticated, redirecting to /login")
            res.redirect('/login');
        }
    }
}