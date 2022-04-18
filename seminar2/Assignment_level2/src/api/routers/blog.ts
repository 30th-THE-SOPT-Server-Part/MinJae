import express, {Request, Response, Router} from 'express';


const router: Router = express.Router();

router.get('/', (req: Request, res: Response) =>{
    return res.send('저는 velog를 사용합니다!')
});

module.exports = router;