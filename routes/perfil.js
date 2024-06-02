const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

const usersFilePath = path.join(__dirname, '../db/users.json');

const getUsers = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

router.get('/', isAuthenticated, (req, res) => {
    res.redirect(`/perfil/${req.session.user.email}`);
});

router.get('/:email', isAuthenticated, (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.email === req.params.email);
    const message = req.query.message || '';

    if (user && req.session.user.email === req.params.email) {
        res.render('perfil', { user, message });
    } else {
        res.render('error', { message: 'Você não tem permissão para acessar este perfil.' });
    }
});

router.post('/:email', isAuthenticated, async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    let users = getUsers();
    const currentUser = users.find(u => u.email === req.params.email);
    
    let hashedPassword = currentUser.password;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    users = users.map(user => {
        if (user.email === req.params.email) {
            return { firstName, lastName, email, password: hashedPassword, phone };
        }
        return user;
    });
    saveUsers(users);
    res.redirect(`/perfil/${email}?message=Perfil atualizado com sucesso!`);
});

module.exports = router;