declare type ErrorInterface = Error;

module Errors {
    declare class Error implements ErrorInterface {
        name: string;
        message: string;
        statusCode: number;
        status: string;
        static captureStackTrace(object:any, objectConstructor?:any):void;
    }

    export class CustomError extends Error {
        constructor(message: string, statusCode:number) {
            super();
            Error.captureStackTrace(this, this.constructor);
            this.name = 'Invalid Parameter Error!';
            this.message = message || 'The parameters for the request or call are incorrect.';
            this.statusCode =  statusCode;
            this.status = `${statusCode}`.startsWith(`4`) ? `fail` : `error`
        }
    }
}

export = Errors;