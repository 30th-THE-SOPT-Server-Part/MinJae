import mongoose from "mongoose";

export interface ReviewInfo {
    writer: mongoose.Types.ObjectId;
    movie: mongoose.Types.ObjectId;
    title: String;
    content: string;
}
