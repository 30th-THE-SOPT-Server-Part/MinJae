import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        name: '강민재',
        message: '강민재님이 확인되었습니다.'
    });
});

module.exports = router;