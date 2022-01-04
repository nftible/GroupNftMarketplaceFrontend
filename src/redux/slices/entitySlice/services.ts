import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { API, Auth } from "aws-amplify";
import { GraphQLResult } from "../../../type";
import { AuthState } from './'
import { UserDataType } from './types';
import { findUser } from "../../../graphql/queries";
import { UsernamePasswordOpts } from '@aws-amplify/auth/lib-esm/types';
import axios from 'axios';
import { CurrentToken } from "../../../utils";
import { User } from '../../../graphql/types';

// export const CurrentAuthenticatedUser = async () => (await Auth.currentAuthenticatedUser({
//     bypassCache: true,
// })) as CognitoUser;

export const findUserMetaMask = async (address: string) => {
    return await API.graphql({
            query: findUser,
            variables: {address},
        }) 
}

export const getAuthUser = async (token: string) => {
    const { data } = await axios.get(`${process.env.API_AUTH}/authuser`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data as {
        exp: number;
        iat: number;
        payload: { firstName: string; lastName: string; publicAddress: string; username: string, picture_url?: string, }
    };
}

export const refreshAuthUser = async (token: string) => {
    const { data } = await axios.get(`${process.env.API_AUTH}/refreshAccessToken`,
        { headers: { Authorization: `Bearer ${token}`, }, }
    );
    // console.log("data", data);
    return data as string;
}

export const signUpMetaMask = async (address: string) => {
    const { data } = await axios.post(`${process.env.API_AUTH}/signup`,
        { publicAddress: address.toLowerCase() },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return data.nonce;
}

export const loginMetaMask = async (address: string, signature: string) => {
    const { data } = await axios.post(`${process.env.API_AUTH}/authenticate`,
        {
            publicAddress: address.toLowerCase(),
            signature,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return data;
}