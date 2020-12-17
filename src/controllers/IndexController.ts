
import { Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../errors';

export class IndexController {

    /* Quand on a une fonction async et qu'on veut typer il faut écrire Promise<> et lui mettre le type, ici any, donc Promise<any> */
    async index(req: Request, res:Response): Promise<any> {
        // throw new Error('!!!!!!!'); erreur test
        // throw new NotFoundError('My Middleware');
        // throw new InternalServerError();
        /* Comme ce sont des fonctions async je retourne le résultat */
        return { message: 'Hello, World' };
    }
}