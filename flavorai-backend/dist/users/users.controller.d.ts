import { Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(req: Request): Promise<{
        id: number;
        email: string;
    }>;
}
