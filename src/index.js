const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const typeDefs = `
    type Query{
				info: String!
				feed: [Link!]!
		}
		type Mutation {
			post(url:String!,description:String!): Link!
		}
		type Link{
			id: ID!
			description: String!
			url: String!
		}
`;

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
    },
  },
};
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is runnning on ${url}`));
