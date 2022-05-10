import { Router } from "express";
import { BlogController } from "../controllers";

const router: Router = Router();

router.post('/', BlogController.createBlog);
router.put('/:blogId', BlogController.updateBlog);
router.get('/:blogId', BlogController.findBlogById);
router.delete('/:blogId', BlogController.deleteBlog);

export default router;
