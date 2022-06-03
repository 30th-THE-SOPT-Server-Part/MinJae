import express, { Request, Response } from "express";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
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

const getMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try{
    const data = await MovieService.getMovie(movieId);

    if(!data) {
        res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route PUT /movie/:movieId/comments/:commentId
 * @desc Update Movie Comment
 * @access Public
 */

const updatedMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

    }

    const commentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;

    try{
       const data = await MovieService.updatedMovieComment(movieId, commentId, req.body.user.id, commentUpdateDto);

       if(!data) {
        res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
       }

       res.status(statusCode.NO_CONTENT).send(util.success(statusCode.OK, message.UPDATE_MOVIE_COMMENTS_SUCCESS));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /movie?search=&option=
 *  @desc GET Movie By Search
 *  @access Public
 */

const getMoviesBySearch = async (req: Request, res: Response) => {
    const { search , option } = req.query;
    const page: number = Number(req.query.page || 1);

    try {
        
        if (search && option) {
            const isOptionType = (option: string): option is MovieOptionType => {
                return ["title","director", "title_director"].indexOf(option) !== -1;
            }
            if (!isOptionType(option as string)) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,message.BAD_REQUEST));
            }

            const data = await MovieService.getMoviesBySearch(search as string, option as MovieOptionType, page);

            res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));

        } else if (!search && !option) {

            const data = await MovieService.getTotalMovies(page);

            res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_ALL_MOVIES_SUCCESS, data));
        }
       
        
        
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default {
    createMovieInfo,
    createMovieComment,
    getMovie,
    updatedMovieComment,
    getMoviesBySearch
}


