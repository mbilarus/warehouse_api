const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

// Item type
const ItemType = new GraphQLObjectType({
    name: "Item",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        count: { type: GraphQLInt },
        SKU: { type: GraphQLString },
    })
});

module.exports = ItemType;