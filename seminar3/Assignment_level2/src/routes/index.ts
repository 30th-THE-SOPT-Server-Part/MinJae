import { Router } from "express";
import BlogRouter from "./BlogRouter";

const router : Router = Router();

router.use('/blog', BlogRouter);

export default router;
