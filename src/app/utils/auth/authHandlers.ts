export function encodePassword(password:string) {
    return Buffer.from(password).toString('base64');
}

export function decodePassword(encodedPassword:string) {
    return Buffer.from(encodedPassword, 'base64').toString('utf-8');
}