# Créer une API REST via typescript et nodeJS

# Début de projet

1) Aller dans le bon répertoire.
2) npm init -> rentrer les informations -> ca crée le package.json
3) créer le répertoire src pour les sources.
4) Créer répertoire test -> les tests c'est une forme de documentation qui vient rajouter un complément à la documentation classique.
5) Créer répertoire static -> tous les fichiers statics, basic.
6) Créer répertoire fixtures -> Les fixtures sont des jeux de données, des fichiers de données, l'objectif est d'alimenter une base de données en partant des fichiers.
7) Créer un fichier .gitignore.
8) Créer un fichier README.md.

# Git

Au début et à chaque modif faire git add . et git commit -m "la modif"
1) git init
2) git add .
3) git commit -m "..."
 


# .gitignore

1) github/gitignore -> récupérer ce qu'on trouve fréquemment en fonction des langages de programmation.
2) Récuperer ce qu'il y a dans node.gitignore et le coller dans gitignore
3) Rajouter .vscode/ dans # Dependency directories qui est notre IDE


# Dépendences via terminal -> package.json

Toutes les dépendences
Partie dependence -> bibliothèque essentielle de base
1) npm i cors 
2) npm i express

Partie dependence dev -> --save-dev
1) npm i --save-dev typescript 
2) npm i --save-dev nodemon 
3) npm i --save-dev @types/cors 
4) npm i --save-dev @types/express
5) npm i --save-dev @types/node
6) npm i --save-dev ts-node 

On peut tout écrire en une fois
npm i --save-dev typescript nodemon @types/cors @types/express @types/node ts-node

NB: Toutes les bibliothèques qu'on va choisir avec typescript, vont s'écrire de la facon suivante sur npm: @types/ et le nom de la bibliothèque compatible avec typescript
La liste est longue.
Dans notre exemple nous telechargement le package par defaut donc express et le package qu'on utilisera dans le cadre du dev donc @types/express

ts-node -> Permet de faire la passerel entre TimeScript et nodeJS


# tsconfig.json

Créer le fichier tsconfig.json à la racine du projet ici le dossier api
Fichier important qui permet de dire a TS de comment se comporter, ce qu'il doit faire.

1) "compilerOptions" sont les options du compilateur car TS est un compilateur donc on doit lui dire ce qu'il doit prendre en compte dans les bibliothèques "lib" pour compiler. 
2) La version qu'on souhaite compiler avec "target". Pour etre sur et certains que ce soit compilable partout on dirait "es5". 
3) La gestion des "module" qui sera "commonjs" qui est le gestionnaire de module par défaut et qui présente une syntaxe qu'on a l'habitude de voir.
4) "moduleResolution": "Node". Stratégie de la façon dont il va résoudre le chargement des modules.
5) La direction du répertoire vers lequel on veut compiler avec "outDir": "./build".
6) "sousrceMap": true permet au fichier d'être compris lorsqu'il est compressé. C'est une forme de carte de comprendre le code JS compressé et le traduit en fichier.map
7) Possibilité de créer les propres décorateurs de TS via "emitDecoratorMetadata": true


# main.ts 

Créer un fichier main.ts dans src pour le test console.log


# TimeScript

Vérifier dans notre fichier node_modules si on a dans le .bin les fichiers ts
Taper dans le terminal tsc --version. Si ca ne fonctionne pas on tape le chemin ./node_modules/.bin/tsc
tsc est le binaire qui permet de compiler TS. 
tsc ./src/main.ts par du fichier ts pour compiler au format .js mais nous n'allons pas compiler à la main.
Juste en tapant tsc il nous compile tous les fichiers .ts en passant par le tsconfig.json dans lequel il trouvera le outDir donc le chemin ou il doit mettre le fichier compilé et sourceMap pour fournir également un fichier .map

On peut ajouter dans package.json, dans script "build": "tsc", on peut laisser tsc dans la console via npm run build


# Configuration nodemon.json

Pourquoi a besoin de nodemon ? Pour éviter de relancer le serveur a chaque fois, il peut vérifier les éventuels changement. Il va devoir surveiller des fichier timeScript
Dans package.json, dans script ajouter "dev": "nodemon"
Créer un fichier nodemon.json dans la racine api.
Dans ce fichier:
1) "watch": ["src"], le watch observe un changement
2) "ext": "ts",
3) "ignore": ["/src/**/*.spec.ts"] -> On lui dit d'ignorer tous les fichiers spec.ts qui serveront aux tests et on a deja un dossier pour les tests.
4) "exec": "ts-node ./src/main.ts" -> permet d'exécuter la passerelle ts-node.
ts-node permet de laisser l'application en mode cli.

On peut lancer nodemon via npm run dev dans le terminal car on l'a ajouté dans le script et via son format .json on n'a pas besoin de préciser son chemin. Il va donc lancer le serveur.
Pour fair exécuter un serveur, il va falloir configurer et installer express.


# Configuration express

A quoi sert Express ? Framework le plus connu. Express permet d'obtenir une instance de la classe Application unique a chaque fois donc autant d'applications que l'on veut avec des routes. On peut faire intéragir avec différentes routes qu'il y a dans nos applications. 
1) Pour faire des imports on va importer express dans le fichier main.ts de la manière suivante: 
import * as express from 'express'; -> Le * correspond à tout.
Ajouter: 
import { Request, Response, Application } from 'express'; -> Permet d'éviter d'ajouter le fragment express avant les propriétés: Eviter le préfixage lorsqu'on veut typer
2) Créer la constant const app = express();
Voir la suite sur le fichier main.ts
Lancer le serveur dans le terminal npm run dev, c'est-à-dire nodemon pour qu'il surveille les changements et des qu'on sauvegarde il fait exécuter les modifications


# Configuration du fichier static

Utilisation du répertoire static comme un répertoire accessible 
A partir du moment que le fichier existe, il pourra y accéder, dans le cas contraire on aura une erreur 404
Dans le fichier main.ts:
app.use(express.static('static'));  
http://localhost:3000/assets/style.css -> api/static/assets/style.css


# Configuration de la base de donnée

On va utiliser un ORM Mapping Objet relationnel qui est une bibliotheque qui va faciliter la tache en terme de gestion de donnée en fonction des tables.
Il permet de récuperer dans une base de données une ligne correspond à une table et de la manipuler comme un objet. 
ORM -> https://typeorm.io/#/
On va donc intégrer typeORM et le configurer.

1) Connecter la base de données dans la dépendence pas celle de développement
Couper le server option + c
2) Ajouter mysql et typeorm ainsi que reflect-metadata
Taper dans le terminal npm i mysql typeorm reflect-metadata

typeorm est la bibliothèque qui permet de simplifier l'utilisation des bases de données
reflect-metadata permet de lire les metadata, interpréter les metadonnées spécifiques.

3) Créer un fichier de config ormconfig.json

4) Importer dans main.ts : import { createConnection } from 'typeorm';
Puis ajouter dans app.listen() avec un try catch

5) Ajouter:
Constante permettant de récupérer le port du serveur 
const PORT = Number(process.env.PORT) || 3000;
Constante permettant de récupérer l'host du serveur
const HOST = process.env.HOST || 'localhost'; -> Soit je prends le nom par défaut soit je prends localhost


# Configuration de ormconfig.json

username et password dépend de la config de l'ordinateur et de la base de donnée
"host": "localhost" -> hôte
"synchronize": true -> permet la synchronisation
"logging": true -> permet d'avoir des logg sur la base de données

Nous avons déjà une base de données. 
1) Démarrer mamp 
2) puis http://localhost:8888/phpMyAdmin pour accéder à phpMyAdmin mais ne pas confondre avec le port  
3) Verifier le port qui doit etre 8889
4) Créer une base de donnée sur phpMyAdmin et mettre exactement le meme nom que la database renseignée dans tsconfig.json

NB: Le prof a crée une base de données poubelle via Docker. 
Docker c'est l'appStore du développeur, on va y chercher des applications qui nous intéresse pour le développement
Le fichier s'appelle docker-composed.yml -> Il permet de composer un pack d'applications. Composer l'application web avec plusieurs applications.
Verifier que l'application Docker est démarrée aupréalable.
Terminal : docker-compose up -d 
-d signifie qu'il s'installe en arrière plan.

# Routes

Dans le dossier src, créer un fichier routes.ts
On y crée une interface pour définir la structure des objets. Et y définir les propriétés de l'objet. Interface ne contient pas d'informations mais uniquement ce que devrait etre une route.
1) method -> GET, POST, DELETE, PUT
2) path -> chemin
3) controller -> objet. C'est la partie qu'il fait le lien entre la vue et le modèle.
4) action ->  method
5) middlewares? -> Un ou plusieurs middlewares donc pour plusieurs il faut un tableau. Au moment de définir la route on se laisse le choix ou pas d'y ajouter un middleware.
6) définir une constante pour définir notre route ou routes.

7) Importer IndexController
import { IndexController } from './controllers/indexController';
8) Ajouter IndexController à controller dans l'objet routes

Gestion des routes
Dans le fichier main.ts
1) import { Routes } from './routes';


# Controllers

Définir un dossier controllers dans src et un fichier indexController.ts dans le dossier controllers
En général, on fait un controller par catégorie, ou fonctionnalité.
Important ne pas tout mettre dans un seul et même controller.
1) Importer Request, Response de 'express'. 
import { Request, Response } from 'express';
2) Définir notre classe
3) Définir les méthodes mais toutes les méthodes seront asynchrones pour ne pas bloquer l'API. C'est un serveur web, donc a partir du moment ou je fais un traitement qui peut etre un peu long dans ma base de donées, je ne veux pas que ca bloque. Une fois finie, elle va tout afficher d'un coup.
Donc utiliser async avant chaque méthode.

# Concernant le app de 'express'

app peut être utilisé comme un tableau
D'habitude pour une route on utilise le app de express via app.get():

app.get('/', (req: Request, res: Response) => {

});

Cependant dans notre exemple on ne peut pas faire app.route.method() pour accéder à la méthode de route, surtout que route n'est pas une propriété de app.Comment faire ?

On va exploiter app comme un tableau et JS nous permet de passer par:

app['get']('/', controller.index);

index correspond à (req: Request, res: Response) comme méthode async de la classe IndexController.  Donc il va falloir instancier IndexController pour accéder à ses méthodes.

const controller = new IndexController():

controller est l'instance de la class IndexController()
*Pour la suite le chemin en argument l'instance de IndexController et sa méthode index.
*Pour rendre le get dynamique, on récupère l'objet route et on y prend sa méthode: -> route.method
*De même pour le chemin: -> route.path
*Pour le IndexController() on fait de meme: -> route.controller
*Pour l'index correspondant à l'action on le remplace par: -> route.action

const controller = new (route.controller);

app[route.method](route.path, controller[route.action]);

La methode index de la class IndexController retourne quelque chose. Donc on va devoir récupérer le résultat de la méthode index.
On retire l'action controller[route.action] et on y met une petite fonction classique.

app[route.method](route.path, (req: Request, res: Response) => {
    const controller = new (route.controller);
    controller[route.action](req, res);
});

Si le chemin de la route marche a ce moment la j'instancie le controller.
On y ajoute action controller[route.action].
C'est pour ca qu'on instancie le controller de manière dynamique dans l'app route. 
Comme c'est une fonction je lui donne les paramètres req et res car c'est une fonction. 
On le met dans une constante car on veut la récupérer vue qu'on souhaite la retourner a cause de la methode index. const result.

app[route.method](route.path, (req: Request, res: Response) => {
    const controller = new (route.controller);
    const result = controller[route.action](req, res);
}); 

Comparaison avec du code en dur: 

app.get('/', (req: Request, res: Response) => {
    const controller = new IndexController;
    const result = controller.index(req, res);
});

L'objet result qu'on récupère doit etre une promise car la méthode est asynchrone. On doit donc s'assurer que ce qui est retourné est une promesse.
Donc on écrit la condition suivante: 

if (result instanceof Promise){
    result.then(success, error);
}

Le then prend deux fonctions: une en cas de succès, une en cas d'erreur.
Success d'abord, error ensuite. 

routes.forEach((route: Route): void => {

app[route.method](route.path, (req: Request, res: Response) => {
    const controller = new (route.controller);
    const result = controller[route.action](req, res);

    if (result instanceof Promise){
    result.then(data => data !== null && data !== undefined ? res.send(data) : undefined,
    err => console.log(err)
    );
    } else if ( result !== null && result !== undefined) {
        res.json(result);
    }  
}); 
});

Si je suis dans une promise:
Si data est différent de null et different de undefined alors on envoie data.
Sinon on affiche l'erreur dans la console.
(else if) Si je ne suis pas dans une promise:
Si result est différent de null et different de undefined alors on envoie result sous format .json.

res.send() -> peut renvoyer autre chose que du .json

# Gérer les erreurs dans les ACTIONS

La gestion d'erreur n'est pas terrible, car en cas d'erreur cela s'affiche dans la console mais ne renvoie rien pour l'utilisateur.
err => { res.status(500).json({message: 'Internal Server Error'})}
S'il y a une erreur, ca renverra une erreur fixe qui est 500. On voudrait faire en sorte d'adapter l'erreur avec le bon code et un message différent.

On se crée un fichier errors.ts dans src. On cré toutes les erreurs à l'intérieur. On crée le gestionnaire d'erreurs ici. Lister l'ensemble des erreurs, avec les codes associés et les messages.

On va créer une class par type d'erreur qui va rassembler les points communs des types d'erreurs.

1) export class DomainError extends Error {} -> On l'appelle Domain car c'est générique. C'est une classe qui va servir de modèle à toutes les autres classes. On l'extends à la class native de JS qui est Error.
=> Ce sera la classe mère de toutes nos erreurs.

2) Déclarer les différentes propriétés en public pour qu'elles soient accessibles partout: 
public reason?: string; -> Correspond à l'info, le message. Optionnel
public code: number = 500; -> le numero de l'erreur
public data?: {}; -> les données. Optionnel

3) Ajouter un constructeur avec message en argument qui correspond à la propriété message de la classe native Error de JS.

4) Ne pas oublier la méthode super() avec message en paramètre qui permet d'avoir toutes les methodes et propriétés natives du constructor de la class ici Error.

5) Dans le constructor on souhaite capturer les traces d'erreur via:
Error.captureStackTrace(this, this.constructor);
Il prend l'objet qu'on lui donne et ajoute la trace des erreurs capturées à l'objet fourni. 
this fait référence à l'instance.

6) export class NotFoundError extends DomainError {}
Cette erreur qui est une erreur 404, a accès a toutes els propriétés de Domaine Error.
On lui crée un constructor qui aura en argument la ressource qu'on a essayé d'atteindre, ainsi que la reason?
Le super() appele le constructor de DomainError qui renvoie au super() de la class native Error

7) Faire de même pour les différentes erreurs

8) Que faire si une personne renvoie une Error qu'on n'a pas défini dans notre gestionnaire d'erreur ?
Dans le main.ts: 

import { DomainError } from './errors';
 
Si l'erreur est d'instance DomainError (signifiant aussi les error qui héritent de instant DomainError comme NotFoundError par exemple) alors on renvoie err.code sous format .json de l'erreur sinon renvoie l'erreur normal non définie.

err instanceof DomainError ? res.status(err.code).json(err) : res.json(err);

NB: Si l'erreur n'est pas définie par nous, autant ne pas afficher de message. Ce n'est pas à nous de gérer tous les messages. Si une erreur n'est pas traitée on pourrait envoyer une erreur 500.


# Gérer les erreurs pour les middlewares

C'est indispensable de traiter les erreurs

Dans le main.ts, après le forEach() et juste avant le listen()
On traite les middlewares en fin de chaine.
On va faire un middleware qui intercepte les erreurs de middleware

En réalité on a 4 arguments, error, requete, response, next: middleware

On importe le type de next:
import { NextFunction } from 'connect';

app.use((err: Error | DomainError, req: Request, res: Response, next: 
NextFunction) => {
});

L'error est de type Error ou DomainError car si elle est connue c'est domainError qui va la traiter avec ses propriétés:
es.status(err.code).json(err); 

Sinon elle sera traitée par Error via: 
res.json(err); 


function handleError(res: Response, err: Error | DomainError){
    if (err instanceof DomainError) {
        res.status(err.code).json(err);
        return;
    }
    res.json(err);
}

Maintenant nous pouvons catcher les erreurs dans les middlewares avec:

app.use((err: Error | DomainError, req: Request, res: Response, next: NextFunction) => {
    handleError(res, err);
    next();
})



