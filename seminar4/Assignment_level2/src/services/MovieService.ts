import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import Movie from "../models/Movie";

const createMovieInfo = async( movieCreateDto: MovieCreateDto): Promise<PostBaseReponseDto> => {
    try{

        const movie = new Movie( {
            title: movieCreateDto.title,
            director: movieCreateDto.director,
            startDate: movieCreateDto.startDate,
            thumbnail: movieCreateDto.thumbnail,
            story: movieCreateDto.story
        });

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

const getMovieInfo = async (movieId: string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId);

        if (!movie){
            return null;
        }

        return movie;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovieInfo = async (movieId: string, movieUpdateDto: MovieUpdateDto): Promise<void> => {
    try {
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);

    } catch (error){
        console.log(error);
        throw error;
    }
}

const deleteMovieInfo = async (movieId: string): Promise<void> => {
    try{
        await Movie.findByIdAndDelete(movieId);

    } catch (error){
        console.log(error);
        throw error;
    }
}

export default {
    createMovieInfo,
    getMovieInfo,
    updateMovieInfo,
    deleteMovieInfo
}
