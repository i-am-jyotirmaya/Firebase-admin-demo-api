"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const express_1 = require("express");
const authenticate_middleware_1 = require("../auth/authenticate.middleware");
const authorize_middleware_1 = require("../auth/authorize.middleware");
const AdminController_1 = require("./AdminController");
const configureRoutes = (app) => {
    const adminRouter = express_1.Router();
    adminRouter.use(authenticate_middleware_1.authenticate);
    adminRouter.use(authorize_middleware_1.authorize(true));
    adminRouter.get('/:uid/make', AdminController_1.makeAdmin);
    adminRouter.get('/:uid/revoke', AdminController_1.revokeAdmin);
    app.use('/admin', adminRouter);
};
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes.js.map