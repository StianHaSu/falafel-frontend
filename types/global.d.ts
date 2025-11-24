export {}

// Create a type for the Roles
export type Roles = 'worker' | 'moderator'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            roles?: Roles[] // Array of roles
        }
    }
}