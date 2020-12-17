import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/* Decorateur Entity car c'est une entité */
@Entity()

export class User {

    /* propriétés */
    /* Décorateur spécifique pour l'id qui génère un uuid */
    /* Un uuid est plus difficile à trouver pour un hacker. Fournit un jeu de données aléatoire et spécifique */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /* Decorateur Column car c'est une column */
    /* Spécifié que la valeur de la column de l'email est unique */
    /* Si on veut un nom différent de la propriété on écrit @Column({ name: 'mail' unique: true }) */
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

}