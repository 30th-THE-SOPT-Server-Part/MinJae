import { PostBaseReponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
import { ReviewsResponseDto} from "../interfaces/review/ReviewsResponseDto";
import Review from "../models/Review";

const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseReponseDto> => {
    try{
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });

        await review.save();
        
        const data = {
            _id: review._id
        };

        return data;
    }catch (error) {
        console.log(error);
        throw error;
    } 
}

const getReviews = async (movieId: string, page: number, search?: string, option?: ReviewOptionType ): Promise<ReviewsResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try{

        if (search && option ) {
            const pattern = regex(search);

            if (option === 'title') {
                reviews = await Review.find({ title: { $regex: pattern} })
                            .where("movie").equals(movieId)
                            .sort({ createdAt: -1 })
                            .skip(perPage * (page - 1))
                            .limit(perPage);
            } else if (option === 'content') {
                reviews = await Review.find({ content: { $regex: pattern} })
                            .where("movie").equals(movieId)
                            .sort({ createdAt: -1 })
                            .skip(perPage * (page - 1))
                            .limit(perPage);
            } else {
                reviews = await Review.find({
                    $or: [
                        {title: { $regex: pattern } },
                        {content: { $regex: pattern} }
                    ]
                })
                .where("movie").equals(movieId)
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
            }

        } else {
            reviews = await Review.find()
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
        }

        const total: number = await Review.countDocuments({movie:movieId});
        const lastPage: number = Math.ceil(total/ perPage);

        const data = {
            reviews,
            lastPage
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default {
    createReview,
    getReviews
}
