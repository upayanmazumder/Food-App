const express = require('express');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmail } = require('firebase/auth');
const firebaseConfig = require('../../firebaseconfig.json');

const router = express.Router();

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

router.post('/', (req, res) => {
    const { email } = req.body;

    signInWithEmail(auth, email)
    .then(() => {
        res.status(200).send({ success: true });
    })
    .catch((error) => {
        res.status(500).send({ success: false, error: error.message });
        console.error(error);
    });
});

module.exports = router;
