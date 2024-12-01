import admin from 'firebase-admin';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        next();
    } catch (err) {
        res.status(500).json({
            error: 'Failed to authenticate token.',
            e: {
                code: err.code || 'auth/unknown-error',
                message: err.message || 'An unknown error occurred while verifying admin status.'
            }
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const userRecord = await admin.firestore().collection('user').doc(req.user.uid).get();

        if (!userRecord.exists) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        const userData = userRecord.data();
        if (userData.role !== 'admin') {
            res.status(403).json({ error: 'User is not an admin.' });
        }
        
        next();
    } catch (err) {
        res.status(500).json({
            error: 'Failed to authenticate token.',
            e: {
                code: err.code || 'auth/unknown-error',
                message: err.message || 'An unknown error occurred while verifying admin status.'
            }
        });
    }
};
