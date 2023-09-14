import express from 'express';
import AuthController from "@controller/api/AuthController";
import env from "@config/env";
import authMiddleware from '@/app/http/middlewares/authMiddleware';

// please don't remove this comment below this will disable crud generator
//controllers imports
import UserController from '@controller/api/UserController';

const router = express.Router();

// auth
router.post('/login', AuthController.login);
router.get("/",(req,res)=>{
    console.log(env)
    res.json({message:"ok"})
} )

router.use(authMiddleware);
// profile
router.get('/profile', AuthController.profile);

// please don't remove this comment below this will disable crud generator
//curd routes

//  users
router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export { router as apiRouter };