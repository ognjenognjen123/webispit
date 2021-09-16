import BaseController from "../../common/BaseController";
import { Request, Response, NextFunction } from "express";
import UserModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IOsobaZaCuvanje, IAddUserValidator } from "./dto/IOsobaZaCuvanje";

export default class UserController extends BaseController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const data: UserModel[] | null | IErrorResponse = await this.services.userService.getAll();

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (Array.isArray(data)) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const userId: number = +(req.params.id);

        if (userId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: UserModel | null | IErrorResponse = await this.services.userService.getById(userId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof UserModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    public async add(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        if (!IAddUserValidator(data)) {
            res.status(400).send(IAddUserValidator.errors);
            return;
        }

        const result: UserModel | IErrorResponse | null = await this.services.userService.addUser(data as IOsobaZaCuvanje);

        res.send(result);
    }




}