export const signup = /* GraphQL */ `
    mutation signup($address: ID!) {
        signup(address: $address) {
            joiningDate
            nonce
            publicAddress
        }
    }
`;

export const authenticate = /* GraphQL */ `
    mutation authenticate($address: ID!, $signature: String!) {
        authenticate(address: $address, signature: $signature)
    }
`;

export const refreshAccessToken = /* GraphQL */ `
    mutation refreshAccessToken {
        refreshAccessToken
    }
`;

export const updateProfile = /* GraphQL */ `
    mutation updateProfile($input: updateProfileInput!) {
        updateProfile(input: $input) {
            username
            displayName
            bio
            publicAddress
            email
            profileImage
            coverImage
        }
    }
`;