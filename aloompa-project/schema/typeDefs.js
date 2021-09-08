const { gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');

const typeDefs = gql`
	scalar Date

	type App {
		id: String!
		name: String!
		appStages: [Stage]
	}

	type Event {
		id: String!
		name: String!
		appId: String
		stageId: String
		description: String
		image: String
		startsAt: Date!
		endsAt: Date!
		stage(id: String): Stage
	}

	type Stage {
		id: String!
		name: String!
		stageEvents(id: String): [Event]
	}

	type Query {
		apps: [App]!
		app(id: String): App
		stages: [Stage!]!
		stageById(id: String): Stage
		stageByName(name: String): Stage
		events: [Event]!
		eventById(id: String): Event
		eventByName(name: String): Event
		eventByDate(startDate: Date, endDate: Date): [Event]
		appEvents(appId: String): [Event]
		# appStages(stageId: String): [Stage]
	}

	input CreateEventInput {
		# id: String!
		name: String!
		appId: String
		stageId: String
		description: String
		image: String
		startsAt: Date!
		endsAt: Date!
	}

	input CreateAppInput {
		name: String!
	}

	input CreateStageInput {
		name: String!
	}
	type Mutation {
		createApp(input: CreateAppInput!): App
		createStage(input: CreateStageInput!): Stage
		createEvent(input: CreateEventInput!): Event
	}
`;

module.exports = { typeDefs };
