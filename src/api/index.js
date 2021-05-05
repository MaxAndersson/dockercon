const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");

const PORT = process.env.API_PORT || "4000"
const DB_HOST = process.env.API_DB_HOST || "bolt://localhost:7687"
const DB_USER = process.env.API_DB_USER || "neo4j"
const DB_PASSWORD = process.env.API_DB_PASSWORD ||  "letmein"

const typeDefs = `
    type Movie {
        title: String
        year: Int
        imdbRating: Float
        genres: [Genre] @relationship(type: "IN_GENRE", direction: OUT)
    }

    type Genre {
        name: String
        movies: [Movie] @relationship(type: "IN_GENRE", direction: IN)
    }
`;

const driver = neo4j.driver(
    DB_HOST,
    neo4j.auth.basic(DB_USER, DB_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
});

server.listen(PORT).then(() => console.log("Online"));