import "mocha"; // navigateur -> server

import * as app from "../src/main";

import chai = require("chai");
import chaiHttp = require("chai-http");
import { expect } from "chai";

chai.use(chaiHttp);

/* Titre qui permet de décrire ce que va faire notre test puis ajoute la fonction qui décrira une suite de tests  */
describe("Hello Test", () => {
  /* ici une uite de tests */
  /* Le mot clé pour le test est it et en argument on met le titre du test comme ca s'il y a une erreur on saura c'était sur quel test */
  it('GET / should return "Hello, World"', () => {
    chai
      .request(app)
      // Le chemin
      .get("/")
      // retour de ce que je suis censé récupéré. Il y a une callback car on ne sait pas dans combien de temps on aura la réponse du server.
      .end((err: any, res: any) => {
        // L'objet réponse doit avoir/etre de type json. Ce sont les propriétés de expect
        expect(res).to.have.json;
        /* On attend un code 200 car tout fonctionne */
        expect(res).to.have.status(200);
        /* On veut récupérer le corps de la response et voir s'il est égale à l'objet .json */
        /* Attention il y a une différence entre eql et equal, donc pour comparer deux objets on passera par eql */
        expect(res.body).eql({message: "Hello, World"});
      });
  });
});
