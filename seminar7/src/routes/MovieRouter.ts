import { Router } from "express";
import { body } from "express-validator";
import { MovieController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovieInfo);

router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);

router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);

router.get('/:movieId', MovieController.getMovie);
router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updatedMovieComment);

router.get('/', MovieController.getMoviesBySearch);
export default router;
