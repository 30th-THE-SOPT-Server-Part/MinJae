import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import FileService from "../services/FileService";

const uploadFileToS3 = async (req: Request, res: Response) => {
    if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

    const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
    const { location, originalname } = image;

    try {
        const data = await FileService.creatFile(location, originalname);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    uploadFileToS3,
}
