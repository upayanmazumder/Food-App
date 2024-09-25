const express = require('express');
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmail, sendEmailVerification } = require('firebase/auth');
const firebaseConfig = require('../firebaseconfig.json');
const logger = require('../logger');

const router = express.Router();

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        const errorMsg = 'Email is required.';
        logger.error(errorMsg);
        return res.status(400).send({ authenticated: false, email: false, error: errorMsg });
    }

    try {
        // Create the user
        const userCredential = await createUserWithEmail(auth, email);
        logger.info(`User created: ${userCredential.user.uid}`);

        try {
            // Send verification email
            await sendEmailVerification(userCredential.user);
            logger.info(`Verification email sent to: ${email}`);

            // Send response back
            res.status(200).send({ authenticated: true, email: true, credentials: userCredential.user });
        } catch (emailError) {
            // Log email sending failure
            logger.error(`Failed to send verification email to ${email}: ${emailError.message}`);
            res.status(200).send({ authenticated: true, email: false, credentials: userCredential.user, error: emailError.message });
        }
    } catch (error) {
        // Handle and log different Firebase auth errors
        let errorMsg;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMsg = 'The email address is already in use by another account.';
                break;
            case 'auth/invalid-email':
                errorMsg = 'The email address is not valid.';
                break;
            default:
                errorMsg = 'An unknown error occurred.';
        }
        logger.error(`Error creating user with email ${email}: ${error.message}`);
        res.status(500).send({ authenticated: false, email: false, error: errorMsg });
    }
});

module.exports = router;
