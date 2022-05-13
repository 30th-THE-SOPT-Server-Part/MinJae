import { Router } from "express";
import { body } from "express-validator";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty(),
    body('startDate').notEmpty(),
    body('story').notEmpty()
], MovieController.createMovieInfo);

router.get('/:movieId', MovieController.getMovieInfo);
router.put('/:movieId', MovieController.updateMovieInfo);
router.delete('/:movieId', MovieController.deleteMovieInfo);

export default router;
