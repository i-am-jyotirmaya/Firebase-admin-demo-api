"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const express_1 = require("express");
const authenticate_middleware_1 = require("../auth/authenticate.middleware");
const authorize_middleware_1 = require("../auth/authorize.middleware");
const UsersController_1 = require("./UsersController");
const configureRoutes = (app) => {
    const userRouter = express_1.Router();
    userRouter.use(authenticate_middleware_1.authenticate);
    userRouter.get('/', [
        authorize_middleware_1.authorize(true),
        UsersController_1.getAllUsers
    ]);
    userRouter.get('/:uid', [
        authorize_middleware_1.authorize(false),
        UsersController_1.getUser
    ]);
    userRouter.post('/add', [
        authorize_middleware_1.authorize(true),
        UsersController_1.createUser
    ]);
    userRouter.put('/:uid', [
        authorize_middleware_1.authorize(true),
        UsersController_1.updateUser
    ]);
    userRouter.post('/addAdmin', [
        authorize_middleware_1.authorize(true),
        UsersController_1.createAdminUser
    ]);
    userRouter.delete('/:id', [
        authorize_middleware_1.authorize(true),
        UsersController_1.deleteUser
    ]);
    userRouter.delete('/', [
        authorize_middleware_1.authorize(true),
        UsersController_1.deleteUsers
    ]);
    userRouter.get('/:uid/revoke', [
        authorize_middleware_1.authorize(true),
        UsersController_1.forceSignOut
    ]);
    app.use('/users', userRouter);
};
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes.js.map