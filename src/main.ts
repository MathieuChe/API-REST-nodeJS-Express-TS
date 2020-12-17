/* Importer tout en tant que alias express à partir de express */
import * as express from 'express';

/* Importer createConnection de typeorm qui permet la connexion à la base de données */
import { createConnection } from 'typeorm';

/* Importer la bibliothèque du body-parser */
import * as bodyParser from 'body-parser';

/* Permet d'éviter d'ajouter le fragment express avant les propriétés: Eviter le préfixage */
import { Request, Response, Application } from 'express';

/* Charger le fichier de Routes qui est un tableau à ne pas oublier 
Route: type de l'interface Route  
routes: correspond à routes dans le fichier routes.ts
*/
import { Route, routes } from './routes';

/* Charger le fichier des erreurs */
import { DomainError } from './errors';

/* Le typage de next */
import { NextFunction } from 'connect';

/* On crée une instance à partir de express */
const app: Application = express();

/* On crée une fonction handleError */
function handleError(res: Response, err: Error | DomainError){
    if (err instanceof DomainError) {
        res.status(err.code).json(err);
        return;
    }
    res.json(err);
}

/* VARIABLES D'ENVIRONNEMENT */

/* Constante permettant de récupérer le port du serveur */
/* Permet de récupérer un nombre à la place du string de process.env.PORT */
const PORT = Number(process.env.PORT) || 3000;

/* Constante permettant de récupérer l'host du serveur */
/* Soit je prends le nom par défaut soit je prends localhost */
const HOST = process.env.HOST || 'localhost';


/* AJOUT DES MIDDLEWARES */

/* Utilisation du répertoire static comme un répertoire accessible 
A partir du moment que le fichier existe, il pourra y accéder, dans le cas contraire on aura une erreur 404 */
app.use(express.static('static')); // http://localhost:3000/assets/style.css

/* On va lui demander de parser le contenu au format .json car API REST */
app.use(bodyParser.json());

/* GESTION DES ROUTES */

/* On utilise un .forEach car routes est tableau donc on veut récupérer chaque route. Ne pas oublier que chaque route est un objet : method, path, controller, action */
routes.forEach((route: Route): void => {
    /* Voir l'explication de ce bout de code dans le README.md */
    app[route.method](route.path, (req: Request, res: Response) => {
        const controller = new (route.controller);
        const result = controller[route.action](req, res);
    
        if (result instanceof Promise){
        result.then(data => data !== null && data !== undefined ? res.send(data) : undefined,
        err => handleError(res, err)
        );
        } else if ( result !== null && result !== undefined) {
            res.json(result);
        }  
    }); 
});

app.use((err: Error | DomainError, req: Request, res: Response, next: NextFunction) => {
    handleError(res, err);
    next();
})


/* ECOUTE DU SERVER */

/* Ajouter le PORT et HOST */
/* export du serveur comme ca le système de test pourra démarrer le serveur et démarrer le test. */
/* On rend async et await donc asynchrone pour qu'on puisse démarrer un autre serveur si l'on souhaite et ca restera non bloquant */
module.exports = app.listen(PORT, HOST, async () => {
    // Permet de savoir que le server a bien démarré.
    console.log(`[express] server has started on localhost:3000`);

    // si j'essaie de me connecter a la base de données et qu'il y a une erreur
    try {
        // Créer la connection
        await createConnection();

    // On catch l'erreur
    } catch (error){
        console.log('[typeorm] connection error:', error);
    }
});