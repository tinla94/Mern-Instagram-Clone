require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// routes
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';
import CommentRoutes from './routes/comment.routes';


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api', AuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', PostRoutes);
app.use('/api', CommentRoutes);

// connect to db
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log(`Connecting to mongodb`)
});

// connecting to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listning to port ${port}`));