import admin from 'firebase-admin';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to authenticate token.' });
    }
};

export const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await admin.auth().getUser(decodedToken.uid);
        if (user.customClaims && user.customClaims.admin === true) {
            next();
        } else {
            res.status(403).json({ error: 'User is not an admin.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to authenticate token.' });
    }
};
