const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const isAuthenticated = require('../middlewares/isAuthenticated');

const lostDogsFilePath = path.join(__dirname, '../db/lostDogs.json');

const getLostDogs = () => {
    if (!fs.existsSync(lostDogsFilePath)) {
        fs.writeFileSync(lostDogsFilePath, '[]');
    }
    const data = fs.readFileSync(lostDogsFilePath);
    return JSON.parse(data);
};

const saveLostDogs = (lostDogs) => {
    fs.writeFileSync(lostDogsFilePath, JSON.stringify(lostDogs, null, 2));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    const lostDogs = getLostDogs();
    res.render('index', { lostDogs, user: req.session.user });
});

router.post('/report', isAuthenticated, upload.single('photo'), (req, res) => {
    const { name, description, address } = req.body;
    const photo = req.file.filename;
    const reporterName = req.session.user.firstName + ' ' + req.session.user.lastName;
    const reporterEmail = req.session.user.email;

    const lostDogs = getLostDogs();
    lostDogs.push({ 
        id: Date.now(),
        name, 
        description, 
        photo, 
        reporterName, 
        reporterEmail, 
        address, 
        status: 'Procurando',
        likes: 0,
        views: 0,
        comments: []
    });
    saveLostDogs(lostDogs);

    res.redirect('/');
});

router.post('/like/:id', isAuthenticated, (req, res) => {
    const lostDogs = getLostDogs();
    const dog = lostDogs.find(d => d.id == req.params.id);

    if (dog) {
        dog.likes = (dog.likes || 0) + 1;
        saveLostDogs(lostDogs);
    }

    res.redirect('/');
});

router.post('/comment/:id', isAuthenticated, (req, res) => {
    const { comment } = req.body;
    const lostDogs = getLostDogs();
    const dog = lostDogs.find(d => d.id == req.params.id);

    if (dog) {
        dog.comments = dog.comments || [];
        dog.comments.push({ user: req.session.user, comment });
        saveLostDogs(lostDogs);
    }

    res.redirect('/');
});

router.get('/edit/:id', isAuthenticated, (req, res) => {
    const lostDogs = getLostDogs();
    const dog = lostDogs.find(d => d.id == req.params.id);

    if (!dog || (dog.reporterEmail !== req.session.user.email && !req.session.user.isAdmin)) {
        return res.redirect('/');
    }

    res.render('edit', { dog, user: req.session.user });
});

router.post('/edit/:id', isAuthenticated, upload.single('photo'), (req, res) => {
    const { name, description, status } = req.body;
    const lostDogs = getLostDogs();
    const dogIndex = lostDogs.findIndex(d => d.id == req.params.id);

    if (dogIndex === -1 || (lostDogs[dogIndex].reporterEmail !== req.session.user.email && !req.session.user.isAdmin)) {
        return res.redirect('/');
    }

    lostDogs[dogIndex].name = name;
    lostDogs[dogIndex].description = description;
    lostDogs[dogIndex].status = status;

    if (req.file) {
        lostDogs[dogIndex].photo = req.file.filename;
    }

    saveLostDogs(lostDogs);
    res.redirect('/');
});

router.post('/delete/:id', isAuthenticated, (req, res) => {
    const lostDogs = getLostDogs();
    const dogIndex = lostDogs.findIndex(d => d.id == req.params.id);
    
    if (dogIndex === -1 || (lostDogs[dogIndex].reporterEmail !== req.session.user.email && !req.session.user.isAdmin)) {
        return res.redirect('/');
    }

    lostDogs.splice(dogIndex, 1);
    saveLostDogs(lostDogs);
    res.redirect('/');
});

module.exports = router;