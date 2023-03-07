
import jwt from 'jsonwebtoken';

import {JWT_SECRET} from '../constants/environment.js'

export const verifyToken = async(req, res, next)=> {
 try {
    let token = req.header('Authorization');
    if(!token){
        return res.status(403).send("Acess Denied");
    }
    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified
    next();

 } catch (error) {
    res.status(500).json({error: error.message})
 }
}