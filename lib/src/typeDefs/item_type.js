const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const GraphQLObjectId = require('graphql-scalar-objectid');

const ItemType = new GraphQLObjectType({
    name: "Item",
    fields: () => ({
        _id: { type: GraphQLObjectId },
        title: { type: GraphQLString },
        count: { type: GraphQLInt },
        SKU: { type: GraphQLString },
    })
});

module.exports = ItemType;