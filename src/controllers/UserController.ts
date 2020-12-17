import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { BadRequest, NotFoundError, ConflictError, UnprocessableEntityError} from "../errors";
import { UserRepository } from "../repository/UserRepository";

export class UserController {
    private userRepo: UserRepository = getCustomRepository(UserRepository);

    async getUsers(req: Request, res: Response): Promise<User[]> {
        /* Methode native de Repository .find() permet de récupérer les users */
        return await this.userRepo.find();
    }

    async getByEmail(req: Request, res: Response): Promise<User> {
        /* Rechercher un utilisateur par email et s'il n'y a pas d'utilisateur ca sera undefined */
        /* On met l'email dans une constante pour la tester avant de faire une requete */
        const email = req.params.email;
        if(!email){
            throw new BadRequest();
        }

        const user: User | undefined = await this.userRepo.findByEmail(email);

        if(!user) {
            throw new NotFoundError(req.url)
        }
        return user;
    }

    /* Ca sera une route en POST donc on doit passer par postman, c'est le seul moyen de tester */
    async register(req: Request, res: Response): Promise<User>{
        const body = req.body;
        const user = new User();

        /* Mapping entre les données du body et celle de l'utilisateur. On travaille toujours avec des objets. Récupérer les info du body pour les donner à l'user */

        user.email = body.email;
        user.setPassword(body.password);

        /* On va accéder à la base de données et au moment ou elle va traiter l'objet, elle peut etre soumise a des erreurs */
        try {
            /* status(201) ca veut dire que ca s'est bien passé */
            res.status(201);
            // throw new Error('hihihihihi');
            await this.userRepo.save(user);
        } catch (err) {
            /* est le code de l'erreur qui s'affiche si on met la même adresse mail 'ER_DUP_ENTRY' */
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictError()
            }
            throw new UnprocessableEntityError();
        }
        return user;
    }

    // async updateUser(req: Request, res: Response){}
}