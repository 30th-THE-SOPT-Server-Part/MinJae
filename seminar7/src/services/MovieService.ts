import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MoviesResponseDto } from "../interfaces/movie/MoviesResponseDto";

import Movie from "../models/Movie";

const createMovieInfo = async( movieCreateDto: MovieCreateDto): Promise<PostBaseReponseDto> => {
    try{

        const movie = new Movie(movieCreateDto);

        await movie.save();
        
        const data = {
            _id : movie.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createMovieComment = async ( movieId: string, movieCommentCreateDto: MovieCommentCreateDto): Promise<MovieInfo | null> => {
    
    try{
        const movie = await Movie.findById(movieId);
        if(!movie) return null;

        const newComments: MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto];

        const updatedMovie = await Movie.findOneAndUpdate({ _id: movieId }, { comments: newComments }, { new: true });
        if(!updatedMovie) return null;

        return updatedMovie;
    } catch (error){
        console.log(error);
        throw error;
    }
}

const getMovie = async (movieId: string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate('comments.writer', 'name');
        if (!movie) return null;

        return movie;
    } catch(error){
        console.log(error);
        throw error;
    }
}

const updatedMovieComment = async (movieId: string, commentId: string, userId: string, commentUpdateDto: MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    
    try{
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {_id: movieId, comments: {$elemMatch: {_id: commentId, writer: userId} } },
            {
                $set: {
                    'comments.$.writer': userId,
                    'comments.$.comment': commentUpdateDto.comment,
                }
            }, { new: true });
    
        return data;   
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMoviesBySearch = async (search: string, option: MovieOptionType, page: number): Promise<MoviesResponseDto> => {
    const regex = (pattern: string) => RegExp(`.*${pattern}.*`);

    let movies: MovieInfo[] = [];
    const perPage: number = 2;

    
    try {
        const titleRegex = regex(search);

        if (option === 'title') {
            movies = await Movie.find({ title: { $regex: titleRegex} })
                        .sort({ createdAt: -1 })
                        .skip(perPage * (page - 1))
                        .limit(perPage);
        } else if (option === 'director') {
            movies = await Movie.find({ director: { $regex: titleRegex} });
        } else {
            movies = await Movie.find({
                $or: [
                    {director: { $regex: titleRegex} },
                    {title: { $regex: titleRegex } }
                ]
            })
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
        }
        
        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total/ perPage);
        
        const data = {
            movies,
            lastPage
        }
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTotalMovies = async (page: number) : Promise<MoviesResponseDto> => {
    
    try{

        const perPage: number = 2;
        const movies: MovieResponseDto[] = await Movie.find()
                        .sort({ createdAt: -1 })
                        .skip(perPage * (page - 1))
                        .limit(perPage);
        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total/ perPage);
        
        const data = {
            movies,
            lastPage
        }

        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export default {
    createMovieInfo,
    createMovieComment,
    getMovie,
    updatedMovieComment,
    getMoviesBySearch,
    getTotalMovies
}
