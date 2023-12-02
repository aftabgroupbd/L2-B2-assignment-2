import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();


// user routes 
router.post('/',UserControllers.createUser);
router.get('/',UserControllers.getAllUser);
router.get('/:userId',UserControllers.getSingleUser);
router.put('/:userId',UserControllers.updateSingleUser);
router.delete('/:userId',UserControllers.deleteSingleUser);

//user order routes
router.put('/:userId/orders',UserControllers.addOrderIntoUser);
router.get('/:userId/orders',UserControllers.getUserOrders);


export const UserRoutes = router;