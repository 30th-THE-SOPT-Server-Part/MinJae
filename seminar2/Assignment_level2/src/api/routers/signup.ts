import express, {Request, Response, Router} from 'express';
import { appendFile } from 'fs';
import { request } from 'http';

const router: Router = express.Router(); 

router.get('/', (req: Request, res: Response) => {
    return res.send('회원가입 하러 왔니?');
});

module.exports = router;