import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.use(express.json());

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) =>{
    res.send("Hello, World! This is level2 assignment server");
});

app.listen('3000', () => {
    console.log("3000번 포트에서 서버 실행!");
});