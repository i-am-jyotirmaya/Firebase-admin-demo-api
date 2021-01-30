import { Application, Router } from "express";
import { authenticate } from "../auth/authenticate.middleware";
import { authorize } from "../auth/authorize.middleware";
import { createAdminUser, createUser, deleteUser, deleteUsers, forceSignOut, getAllUsers, getUser, updateUser } from "./UsersController";

export const configureRoutes = (app: Application) => {
    const userRouter = Router();

    userRouter.use(authenticate);

    userRouter.get('/', [
        authorize(true),
        getAllUsers
    ]);

    userRouter.get('/:uid', [
        authorize(false),
        getUser
    ]);

    userRouter.post('/add', [
        authorize(true),
        createUser
    ]);

    userRouter.put('/:uid', [
        authorize(true),
        updateUser
    ])
    
    userRouter.post('/addAdmin', [
        authorize(true),
        createAdminUser
    ]);

    userRouter.delete('/:id', [
        authorize(true),
        deleteUser
    ]);

    userRouter.delete('/', [
        authorize(true),
        deleteUsers
    ]);

    userRouter.get('/:uid/revoke', [
        authorize(true),
        forceSignOut
    ]);

    app.use('/users', userRouter);
}