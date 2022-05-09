import express, { Request, Response } from "express";
import util from "../modules/util";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
import { BlogService } from "../services";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";


/**
 *  @route POST /blog
 *  @desc Create Blog
 *  @access Public
 */

const createBlog = async (req: Request, res: Response): Promise<void> => {
    const blogCreateDto: BlogCreateDto = req.body;

    try {
        const data: PostBaseReponseDto = await BlogService.createBlog(blogCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_BLOG_SUCCESS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /blog/:blogId
 *  @desc Update Blog
  *  @access Public
 */

const updateBlog = async (req: Request, res: Response): Promise<void> => {
    const blogUpdateDto: BlogUpdateDto = req.body;
    const { blogId } = req.params;

    try{
        await BlogService.updateBlog(blogId, blogUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route Get /blog/:blogId
 *  @desc READ Blog
 *  @access Public
 */
const findBlogById = async(req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params;

    try{
        const data = await BlogService.findBlogById(blogId);

        if(!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

            res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_BLOG_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /blog/:blogId
 *  @desc Delete blog
 *  @access Public
 */

const deleteBlog = async ( req: Request, res: Response) : Promise<void> => {
    const { blogId } = req.params;

    try{
        await BlogService.deleteBlog(blogId);
        
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_BLOG_SUCCESS));
    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}
export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}
