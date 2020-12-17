
export class DomainError extends Error {
    /* public permet que ces propriétés sont accessibles */
    public reason?: string;
    public code: number = 500;
    public data?: {};

    /* Le message appartient deja à la classe Error, c'est une de ses propriétés */
    constructor(message: string) {
        /* La méthode super du constructeur */
        super(message); 

        /* Elle va capturer toutes les traces empilées  */
        Error.captureStackTrace(this, this.constructor);
    }

}

export class NotFoundError extends DomainError {
    constructor(resource: string, reason?: string) {

        super(`Resource ${resource} was not found`);
        /* NotFoundError correspond à une erreur 404 */
        this.code = 404;
        /* On peut donner une reason mais elle reste optionnelle */
        this.reason = reason;
    }
}

export class InternalServerError extends DomainError {
    constructor(reason?: string) {

        super(`Internal Server Error`);
        /* InternalServerError correspond à une erreur 404 */
        this.code = 500;
        /* On peut donner une reason mais elle reste optionnelle */
        this.reason = reason;
    }
}