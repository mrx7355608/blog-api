import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config/index.js';
import passport from 'passport';
import session from 'express-session';
import { catch404, globalErrorHandler } from './utils/errorHandlers.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import './passportSetup.js';
import blogRouter from './routes/blog.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

// TODO: setup mongodb store for sessions
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/blogs', blogRouter)

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
