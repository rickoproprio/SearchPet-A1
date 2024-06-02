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
    const user = req.session.user || null;
    res.render('register', { message, user });
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    const users = getUsers();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        res.redirect('/register?message=Email já está em uso.');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ firstName, lastName, email, password: hashedPassword, phone, isAdmin: false });
        saveUsers(users);
        res.redirect('/login?message=Usuário registrado com sucesso.');
    }
});

module.exports = router;