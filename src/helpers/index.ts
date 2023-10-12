import crypto from 'crypto';

const SECRET = "IITMadras"

export const random = () => crypto.randomBytes(64).toString('base64')

export function hash(password:string, salt:string){

    return crypto.createHmac('sha256', [password,salt].join('/')).update(SECRET).digest('hex')

}

