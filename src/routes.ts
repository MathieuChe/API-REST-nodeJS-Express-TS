import { IndexController } from './controllers/indexController';
import { UserController } from './controllers/UserController';

export interface Route {
    method: string; // get, post, put, delete
    path: string; // /chemin
    controller: any; // Objet
    action: string; // method
    middlewares?: Function | Function[]; // Cette propriété est optionnelle. On peut avoir plusieurs middleware pour une même route
}

export const routes: Route[] = [
    {
        method: 'get', // get est en minuscule
        path: '/',
        controller: IndexController, // Un controller possède plusieurs méthodes
        action: 'index' // Le controller fait appel à cette méthode
    },
    {
        method: 'get', 
        path: '/users',
        controller: UserController, 
        action: 'getUsers'  
    },
    /* Trouver un utilisateur par email */
    {
        method: 'get', 
        path: '/users/email/:email',  
        controller: UserController, 
        action: 'getByEmail'  
    },
    /* Enregistrer un utilisateur */
    {
        method: 'post', 
        path: '/register',  
        controller: UserController, 
        action: 'register'  
    }
]