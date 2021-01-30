export interface User {
    uid: string,
    email: string | undefined,
    displayName: string | undefined,
    lastSignInTime: string,
    creationTime: string,
    emailVerified: boolean,
    admin: boolean
}