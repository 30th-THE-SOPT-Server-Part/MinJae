import { Router } from "express";
import { body, check } from "express-validator";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty(),
    check('startDate').isISO8601().toDate(),
    body('story').notEmpty()
], MovieController.createMovieInfo);

router.get('/:movieId', MovieController.getMovieInfo);
router.put('/:movieId', [
    body('story').notEmpty(),
    check('startDate').isISO8601().toDate()
],MovieController.updateMovieInfo);
router.delete('/:movieId', MovieController.deleteMovieInfo);

export default router;
