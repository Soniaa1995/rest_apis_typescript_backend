import { Request, Response, NextFunction } from "express"
import {validationResult } from "express-validator";


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Solo se ejecuta cuando NO esta vacio
        return res.status(400).json({ errors: errors.array() });
    }  

    next() //se va a la siguiente funcion
}