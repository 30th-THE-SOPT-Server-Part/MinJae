import { Router } from "express";
import { body } from "express-validator";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovieInfo);

router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);

router.get('/:movieId', MovieController.getMovie);


export default router;
