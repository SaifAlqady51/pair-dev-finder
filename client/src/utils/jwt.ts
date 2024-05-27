import * as jwt from "jsonwebtoken";


export function encrypt(message:object){
    return jwt.sign(message, process.env.JWT_SECRET!, {
        algorithm: "HS512",
    })
}

export function decrypt(token:string){

  return jwt.decode(token);
}