import { Router } from "express";
const router = Router();

router.get('/', (req, res) =>{
    console.log('Index Works');
    res.send('received');
});

export {router};