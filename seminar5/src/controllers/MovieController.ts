import express, { Request, Response } from "express";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
const { validationResult } = require('express-validator');

/**
 *  @route POST /movie
 *  @desc Create Movie
 *  @access Public
 */

const createMovieInfo = async ( req: Request, res: Response): Promise<void | Response> => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCreateDto: MovieCreateDto = req.body;

    try{
        const data = await MovieService.createMovieInfo(movieCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const createMovieComment = async( req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try{
        const data = await MovieService.createMovieComment(movieId, movieCommentCreateDto);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_COMMENT_SUCCESS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createMovieInfo,
    createMovieComment,
}


