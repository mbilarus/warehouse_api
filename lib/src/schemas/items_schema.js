const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { ObjectId } = require('mongodb');
const ItemType = require('../typeDefs/item_type');
const client = require('../../../bin/server');
const items = client.db('warehouse').collection('items');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        findAllItems: {
            type: new GraphQLList(ItemType),
            args: {
                title: { type: GraphQLString },
                count: { type: GraphQLInt },
                SKU: { type: GraphQLString },
            },
            async resolve(_, args) {
                return await items.find(args).toArray();
            }
        },
        findById: {
            type: ItemType,
            args: {
                id: { type: GraphQLString },
            },
            async resolve(_, args) {
                if (args.id) {
                    args._id = ObjectId.createFromHexString(args.id);
                    delete args.id;
                }
                let item = await items.findOne(args);
                if (!item) {
                    throw new Error('Item not found');
                }
                return item;
            }
        },
    }
});

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
                let item = await items.insertOne({
                    title: args.title,
                    count: args.count,
                    SKU: args.SKU,
                });
                args.id = item.insertedId;
                return args;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
