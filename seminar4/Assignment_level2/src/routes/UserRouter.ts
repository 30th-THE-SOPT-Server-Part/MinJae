import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";

const router: Router = Router();

//routes => use {/user} => post {/}
router.post('/',[
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('email').isEmail(),

], UserController.createUser);

router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;
