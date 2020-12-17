import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    /* Si on cherche un utilisateur par son email qui n'existe pas dans le repository on crée la méthode */
    /* Est une methode qui n'éxiste pas dans le Repository donc va étendre les méthodes */
    /* Elle retournera une promise qui sera soit un User soit undefined */
    async findByEmail(value: string): Promise<User | undefined> {
        /* On donne des objets de condition: le where est l'email dans la table doit être égale à celle fournie par l'utilisateur */
        return await this.findOne({ where: { email: value } });
    }
}