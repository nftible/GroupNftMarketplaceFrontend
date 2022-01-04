const awsmobile = {
    "aws_project_region": process.env.AWS_REGION,
    "aws_appsync_graphqlEndpoint": process.env.APPSYNC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.AWS_REGION,
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": process.env.APPSYNC_GRAPHQL_API_KEY
};


export default awsmobile;