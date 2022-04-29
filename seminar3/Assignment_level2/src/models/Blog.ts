import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    hashtag: {
        type: String
    }

});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);
