export const findUser = /* GraphQL */ `
    query findUser($address: ID!) {
        findUser(address: $address) {
            joiningDate
            nonce
            publicAddress
        }
    }
`;

export const getUserProfile = /* GraphQL */ `
    query getUserProfile($input: getUserProfileInput!) {
        getUserProfile(input: $input) {
            bio
            coverImage
            displayName
            email
            profileImage
            publicAddress
            refId
            username
        }
    }
`;

export const getUsersNfts = /* GraphQL */ `
    query getUsersNfts($input: getUsersNftsInput!) {
        getUsersNfts(input: $input) {
            data {
                tokenId
                nftAddress
                tokenUri
                contractType
                name
                amount
                symbol
                blockNumber
                blockNumberMinted
                metadata
                syncedAt
            }
            count
        }
    }
`;

export const authUser = /* GraphQL */ `
    query authUser {
        authUser {
            userAuthData {
                joiningDate
                nonce
                publicAddress
                tokenExpiryDate
            }
            userData {
                bio
                coverImage
                displayName
                email
                profileImage
                publicAddress
                refId
                username
            }
        }
    }
`;

export const usernameAvailable = /* GraphQL */ `
    query usernameAvailable($username: String!) {
        usernameAvailable(username: $username)
    }
`;