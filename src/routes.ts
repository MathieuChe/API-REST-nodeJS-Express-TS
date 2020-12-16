import { IndexController } from './controllers/indexController';

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
]