import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
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


export default {
    createMovieInfo,
    createMovieComment,
}
