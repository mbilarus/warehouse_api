const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const GraphQLObjectId = require('graphql-scalar-objectid');
const ItemType = require('../typeDefs/item_type');
const client = require('../../../bin/server');
const items = client.db('warehouse').collection('items');

// Find items
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllItems: {
            type: new GraphQLList(ItemType),
            args: { title: { type: GraphQLString }, _id: { type: GraphQLObjectId } },
            async resolve(_, args) {
                return await items.find(args).toArray();
            }
        }
    }
});

// Create item
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createItem: {
            type: ItemType,
            args: {
                title: { type: GraphQLString },
                count: { type: GraphQLInt },
                SKU: { type: GraphQLString },
            },
            async resolve(_, args) {
                await items.insertOne({
                    title: args.title,
                    count: args.count,
                    SKU: args.SKU,
                });
                return args;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
