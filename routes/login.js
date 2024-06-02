const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../db/users.json');

const getUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, '[]');
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

router.get('/', (req, res) => {
    const message = req.query.message || '';
    const redirect = req.query.redirect || '';
    const user = req.session.user || null;
    res.render('login', { message, redirect, user });
});

router.post('/', async (req, res) => {
    const { email, password, redirect } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = user;
            return res.redirect(redirect || '/');
        }
    }
    res.redirect('/login?message=Email ou senha incorretos.&redirect=' + encodeURIComponent(redirect));
});

module.exports = router;
