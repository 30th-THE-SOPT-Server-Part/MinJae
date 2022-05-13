import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { UserService } from "../services";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
const { validationResult } = require('express-validator');

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response): Promise<void | Response> => {
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const userCreateDto: UserCreateDto = req.body;
    try {
        const data: PostBaseReponseDto = await UserService.createUser(userCreateDto);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    
    }catch (error) {
        console.log(error);
        // 서버 내부에서 에러 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR))};
}

/**
 *  @route PUT /user/:userId
 *  @desc Update User
 *  @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;
    
    try {
        await UserService.updateUser(userId, userUpdateDto);

        res.status(statusCode.NO_CONTENT).send();   //  204
    
    }catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR))};
}

/**
 *  @route Get /user/:userId
 *  @desc READ User
 *  @access Public
 */
const findUserById = async(req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        return res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_USER_SUCCESS, data));
    
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /user/:userId
 *  @desc Delete User
 *  @access Public
 */
const deleteUser = async(req: Request, res: Response) => {
    const { userId } = req.params;

    try{
        await UserService.deleteUser(userId);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_USER_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}
export default { 
    createUser,
    updateUser,
    findUserById,
    deleteUser
}
