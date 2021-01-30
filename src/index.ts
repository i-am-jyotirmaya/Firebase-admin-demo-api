import express from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { configureRoutes as configureRoutesForUsers } from './modules/users/routes';
import { configureRoutes as configureRoutesForAdmin } from './modules/admin/routes';

const dotenvKey = dotenv.config();

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.DB_URL
});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

configureRoutesForUsers(app);
configureRoutesForAdmin(app);


app.listen(port, () => {
    console.log('Server listening at port '+port);
});