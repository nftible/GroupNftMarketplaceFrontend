import React from "react";
import Amplify, { API } from "aws-amplify";
import awsmobile from "./aws-exports";
import { Provider } from 'react-redux';
import store from './redux/store';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from "./web3-config";
import { CurrentToken } from "./utils";
import {  authUser} from "./graphql/queries";
import { refreshAccessToken } from "./graphql/mutations";

const getToken = () => {
    const { token } = new CurrentToken().get();
    if (token) {
        return token;
    }
    return null;
}

const getExpiryDate = () => {
    const { expiry_date } = new CurrentToken().get();
    if (expiry_date) {
        return expiry_date;
    }
    return null;
}

export default ({ element }) => {

    Amplify.configure(awsmobile);
    // Auth.configure(awsmobile);
    Amplify.configure({
        API: {
            graphql_endpoint: awsmobile.aws_appsync_graphqlEndpoint,
            graphql_headers: async (e: any) => {
                const token = getToken();
                const expiry_date = getExpiryDate();
                const millis = expiry_date && (expiry_date * 1000) - Date.now() || 0;
                const diff = Math.floor(millis / 60000);

                if (diff && diff <= 20) {
                    const authen: any = await API.graphql({
                        query: refreshAccessToken,
                        authMode: "AWS_LAMBDA",
                        authToken: `Bearer ${token}`
                    })
                    new CurrentToken().remove();
                    const user_auth: any = await API.graphql({
                        query: authUser,
                        authMode: "AWS_LAMBDA",
                        authToken: `Bearer ${authen.data.refreshAccessToken}`
                    })
                    new CurrentToken().set({ token: authen.data.refreshAccessToken, expiry_date: user_auth.data.authUser.token_exp });
                }

                if (getToken() === null && e.query.definitions[0].name.value !== "authUser" && e.query.definitions[0].name.value !== "refreshAccessToken") {
                    return {
                        /* if token is null use API_KEY instead for authorization */
                        'x-api-key': awsmobile.aws_appsync_apiKey,
                    };
                }
                else if(e.query.definitions[0].name.value !== "authUser" && e.query.definitions[0].name.value !== "refreshAccessToken") {
                    return {
                        /* if token is null use API_KEY instead for authorization */
                        Authorization: `Bearer ${getToken()}` || undefined,
                    };
                }
            },
        },
    });


    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store} >
                {element}
            </Provider>
        </Web3ReactProvider>
    );
}