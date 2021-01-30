import { Application, Router } from "express";
import { authenticate } from "../auth/authenticate.middleware";
import { authorize } from "../auth/authorize.middleware";
import { makeAdmin, revokeAdmin } from "./AdminController";

export const configureRoutes = (app: Application) => {
    const adminRouter = Router();

    adminRouter.use(authenticate);
    adminRouter.use(authorize(true));

    adminRouter.get('/:uid/make', makeAdmin);

    adminRouter.get('/:uid/revoke', revokeAdmin);

    app.use('/admin', adminRouter);
}