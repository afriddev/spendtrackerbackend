export function encodeEmailId(value:string) {
    return Buffer.from(value).toString('base64');
}

export function decodeAuthToken(value:string) {
    return Buffer.from(value, 'base64').toString('utf-8');
}