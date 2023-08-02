const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(8888., () => { console.log('Server is Running!') });
