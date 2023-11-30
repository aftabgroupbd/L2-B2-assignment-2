import express from 'express';

const router = express.Router();


// user routes 
router.post('/create',StudentControllers.createStudent);


export const StudentRoutes = router;