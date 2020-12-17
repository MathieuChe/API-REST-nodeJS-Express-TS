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
4) git push origin main
 


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
Il prend l'objet qu'on lui donne et ajoute la trace des erreurs capturées à l'objet fourni. Il va créer une propriété stack dans mon objet.
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


# Les tests

Les tests unitaires (concentré sur une unité dans le code) et les tests d'intégration (concentré sur un aspect plus large de l'application, un peu plus général qui va déclenché un ensemble d'évènements). Et les tests fonctionnels.

Les tests sont très importants. Il ne s'agit pas de tester les fonctionalités individuellement mais de tester également l'ensemble des fonctionalités en meme temps. 
Il va donc falloir scripter nos tests car si on en a mille on ne va pas les faire un part un part. 
Pour scripter les tests il va falloir importer des modules et indiquer le répertoire de tests. Les modules vont s'exécuter dans ce répertoire. Si un seul test sur l'ensemble des tests qui ne passe pas, tous les voyants sont rouges. Il faut absolument que tous les tests passent.
Le problème est que les tests, nous les définissons donc nous ne pensons pas à 100% à tout donc on peut passer a coté de certains tests. Ce n'est pas infaillible. 

Téléchargement des modules en phase de développement --save-dev
les plateforms: 
https://www.chaijs.com/ -> test d'intégration
https://mochajs.org/ -> simulation environnement de type navigateur: marcherait sur n'importe quel navigateur

On récupère les bibliothèques:
npm i --save-dev chai chai-http @types/chai @types/chai-http
npm i --save-dev mocha @types/mocha

npm i --save-dev chai chai-http @types/chai @types/chai-http mocha @types/mocha

NB: Généralement on commence par le test plutot que de coder -> méthode TDD

Création du fichier index.controller.spec.ts dans le dossier test
Définir si on veut faire un expect, un should ou un assert.
On va débuter par un test fonctionnel plutot qu'un test unitaire.
test intégration (comprend un BDD) > test fonctionnel (peu comprendre une BDD) > test unitaire (pas de BDD).

Commencer par importer la bibliothèque mocha: 
1) import 'mocha'; c'est le navigateur mais il a besoin d'un serveur donc il faut que le gestionnaire de test soit capable de démarrer le server. 
Il faut que mocha puisse se connecter au serveur pour tester l'api.

2) import * as app from '../src/main'; -> pour récupérer le app pour récupérer le serveur

3) Importer les bibliothèques chai et chai-http
import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from 'chai';

4) Dans le main.ts, on a besoin d'exporter //ecoute du serveur comme ca le système de test pourra démarrer le serveur et démarrer le test.
On rend le app.listen() asynchrone donc ajout de async et await pour qu'on puisse démarrer un autre serveur si l'on souhaite et ca restera non bloquant

5) Retour dans index.controller.spec.ts
chai.use(chaiHttp);

6) Titrer qui permet de décrire ce que va faire notre test puis ajoute la fonction qui décrira une suite de tests: 
describe('Hello Test', () => {
    /* ici une uite de tests */
    /* Le mot clé pour le test est it et en argument on met le titre du test comme ca s'il y a une erreur on saura c'était sur quel test */
    it('GET / should return "Hello, World', () => {
        let name = 'foo';
        /* J'attends que le name soit égal à foo */
        expect(name).equal('foo')
    })
})

7) Aller dans la rubrique script de package.json pour modifier le "test".
Test fonctionnel avec mocha mais plus integration car exploitation BDD, on va le regarder avec --watch et ajout de pluggin avec --require et le pluggin ts-node/register mais aussi regarder l'extension de ts et enfin indiquer le répertoire de test qui est récursif et tu prends tous les fichiers qui ont n'importe quel nom avec l'extension .spec.ts

ts-node sert a lancer le code et l'executer via JS sans le compiler.
"mocha --watch --require ts-node/register --watch-extension ts test/**/*.spec.ts"

Pour faire le test ecrire dans le terminal -> npm run test
Pour vérifier que l'environnement fonctionne on exécute le test de index.controller.spec.ts avec:
let name = 'foo';
        expect(name).equal('foo') --> Affichera en vert car c'est ce qui est attendu

let name = 'foo';
        expect(name).equal('fool') --> Affichera en rouge car ce n'est pas ce qui est attendu

Donc notre test est fonctionnel.

# Test du controller

On veut tester la fonction async index(){ return { message: 'Hello, World' }}

Retour dans index.controller.spec.ts
Dans le it('GET / should return "Hello, World', () => {
chai.request(app) -> Il appelle le server pour démarrer le navigateur
get('/') -> Le chemin
end((err: any, res: any) -> retour de ce que je suis censé récupéré. Il y a une callback car on ne sait pas dans combien de temps on aura la réponse du server.
expect(res).to.have.json; -> L'objet réponse doit avoir/etre de type json. Ce sont les propriétés de expect.
expect(res).to.have.status(200); -> On attend un code 200 car tout fonctionne 
expect(res.body).eql({message: "Hello, World"}); -> On veut récupérer le corps de la response et voir s'il est égale à l'objet .json 
/*\ Attention il y a une différence entre eql et equal, donc pour comparer deux objets on passera par eql 

# Base de données gérée par typeORM

typeorm facilite la sélection de la base de données sql type mysql, postgres et parfois mongoDB car c'est une exception.
On ne tente plus de passer directement à la base de donnée. On passe par un ORM (Object Relationship Mapping). 
Le principe du mapping -> fait référence a carte donc sous entendre le terme correspondance. C'est la correspondance entre une class et une table en base.

Nous avons un design pattern MVC donc on fait de la POO. On travaille donc avec des objets mais en partant de la DB on récupère un tableau. Donc chaque ligne correspond à un objet. 
=> On veut récupérer autant d'objets qu'il y a de ligne dans la table. Pour cela il faut passer par le mapping car par défaut ca ne se fait pas naturellement.
Donc ORM le principe est de mapper (faire correspondre) une ligne du tableau avec un objet choisi d'une classe qui correspond au modèle de données.
typeORM a le système d'automatisation qui fera le mapping à notre place.

Si on n'a pas typeORM, comment faire du mapping de ligne de tableau en objet ?
Voir photo mapping

=> Après avoir créé notre class (= entité) avec les propriétés (id, name, etc.), typeORM va directement faire les requetes sur les tables pour faire du mapping et récupérer les objets à travers la table. Il fait de la DAO. On n'aura plus qu'à manipuler les objets.
typeORM est aussi capable de créer les bases de données.

Les ORM de Node:
typeORM
sequelize
doctrine
propel

Pour travailler avec des entités on va devoir importer une bibliothèque reflect-metadata car typeORM utilise des décorateurs. On définit les entités avec les décorateurs @.
Il y a aussi des décorateurs qui gèrent les évènements.

Retour dans le fichier main.ts
1) Importer reflect-metadata -> import 'reflect-metadata';
Retour dans le fichier tsconfig.json

2) Configurer
"emitDecoratorMetadata": true -> Les décorateurs peuvent émettre "experimentalDecorators": true -> optionnel

Créer un répertoire entites dans src
Créer User.entities.ts
3) Créer des entités

# Envoyer les entités vers le server de DB

typeorm dans le terminal fourni de l'aide
NB: s'il ne reconnait pas la commande écrire npm i -g typeorm pour l'installer en global

Aller dans le fichier ormconfig.json pour spécifier le chemin de tous nos répertoires pour ne pas avoir à le refaire à chaque fois.

Pour connaitre les répertoires:
"entities": ["'src/entities/**/*.{ts,js}'"], -> ou se trouvent toutes les classes. /*\ aux " ' ' " . terminal: typeorm schema:sync
Pour envoyer l'entité avec typeorm, faire la requete vers la base et l'envoyer vers le serveur on écrit dans le terminal:
typeorm schema:sync
/*\ Cependant dans phpMyAdmin on a aucune base de créée.

"entities": ["src/entities/**/*.ts","build/entities/**/*.js"] -> Permet avec npm run dev de créer les tables sans utiliser le sync. terminal: npm run dev  
/*\ Ca nous crée les tables dans phpMyAdmin   

"migrations": ["src/migrations/**/*.ts"], -> permet de faire évoluer la structure de la db et de pouvoir version les db si on veut revenir en arriver
"subscribers": ["src/subscribers/**/*.ts"], -> automatiser de facon évènementiel les tâches

Pour les commandes cli
"cli": {"entitiesDir": "src/entities",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscribers"}

Le problème est que nous étions dans l'environnement typescript lorsque nous lancions la commande, donc ca renvoyait une erreur, il n'était pas capable de le gérer. Il faut donc le mettre dans le contexte ts-node comme suivant dans le script de package.json: 

"typeorm": "ts-node ./node_modules/typeorm/cli -f ./ormconfig.json",
-> Jutilise le contexte d'execution ts-node, puis utilisation de l'utilitaire cli dans le contexte ts-node puis le chemin. 
Donc npm run typeorm reste dans le contexte ts-node
"schema:sync": "npm run typeorm schema:drop && npm run orm schema:sync",
-> Suppression avec le drop puis (&&) sync pour synchroniser mais le tout dans le contexte ts-node

Il avait donc besoin d'être exécuté dans un contexte ts-node
Donc pour synchroniser la base on doit écrire dans le terminal:
npm run schema:sync


# Les fixtures

Lorsqu'on aura des données a précharger dans la db, on passe par les fixtures.
On va installer un nouveau package:
https://www.npmjs.com/package/typeorm-fixtures-cli

extension .yml est comme un format .json mais en plus évolué, plus lisible, simplifié et amélioré.

1) npm i typeorm-fixtures-cli --save-dev -> Vérifier que c'est installé dans le package.json
2) Dans le script de package.json ajouter:
"fixtures": "fixtures ./fixtures --config ormconfig.json --require ts-node/register" -> le binaire fixtures, le chemin, la config du fichier ormconfig.json et require le ts-node/register
3) dans le dossier fixture créer les fichiers .yml pour chaque entité
Créer un fichier qu'on appellera User.yml
4) On ne met pas l'id car il est autogénéré via uuid
Petite particularité avec le mot de passe. Il doit être crypté.
2 facons: soit on met une chaine cryptée directement soit on fait appel a une fonction définie dans le fichier User.ts. 
Pour faire appel a une fonction dans User.yml, on utilise _call: puis le nom de la fonction en dessous de la manière suivante:
__call:
      setPassword: # setPassword("00000", 'arg1', 'arg2')
        - "00000"
        - "arg1"
        - "arg2"

5) Il va nous falloir une petite bibliothèque pour encrypter le mot de passe.
npm i bcryptjs
/*\ Ne jamais utiliser de md5, sha1 pour crypter car pas du tout sécurisé.

6) Udpater dans User.ts le firstName et le lastName avec @Column et la fonction setPassword.
setPassword(password: string): void {
        this.password = bcrypt.hashSync(password);
    }

7) Importer la bibliothèque bcryptjs dans User.ts
import * as bcrypt from 'bcryptjs';

8) faire un npm run schema:sync pour tout synchroniser
9) Puis faire npm run fixtures