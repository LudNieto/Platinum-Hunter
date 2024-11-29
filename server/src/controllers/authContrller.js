import admin from '../config/firebase';

export const register = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await admin.auth().createUser({
            email,
            password
        });
        res.status(201).json({message: 'Usuario creado correctamente.', userId: user.uid})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}