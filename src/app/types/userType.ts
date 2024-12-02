export type userSignUpPayloadType = {
    emailId:string,
    password:string,
    firstName:string,
    lastName:string,
    phoneNumber:number,
    authToken?:string | null
    otp?:string | null
}

export type userLoginPayloadType = {
    emailId:string,
    password:string,
    otp?:number | null
}
export type configureAmountsPayloadType = {
    monthlyAmount:number,
    emailId:string

}