const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');

const app = express();

const tasks = [{ id: 0, content: "Watching TV" }, { id: 1, content: "Washing Dishes" }];

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLInt },
        content: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: GraphQLList(TaskType),
            resolve: () => tasks,
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                content: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const newTask = { id: tasks.length + 1, content: args.content };
                tasks.push(newTask);
                return newTask;
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
