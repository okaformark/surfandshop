const axios = require('axios');

const URL = `http://assets.aloompa.com.s3.amazonaws.com/rappers/hiphopfest.json`;
const resolvers = {
	Query: {
		apps: () => {
			return axios
				.get(URL)
				.then((res) => res.data.apps)
				.then((data) => {
					return data;
				});
		},
		app: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.apps)
				.then((data) => data.find((da) => da.id === args.id))
				.then((d) => {
					return d;
				});
		},
		stages: () => {
			return axios
				.get(URL)
				.then((res) => res.data.stages)
				.then((data) => {
					return data;
				});
		},
		stageById: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.stages)
				.then((data) => data.find((da) => da.id === args.id))
				.then((d) => {
					return d;
				});
		},
		stageByName: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.stages)
				.then((data) => data.find((da) => da.name === args.name))
				.then((d) => {
					return d;
				});
		},
		events: () => {
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) => {
					return data;
				});
		},
		eventById: (parent, args) => {
			console.log({ parent });
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) => data.find((da) => da.id === args.id))
				.then((d) => {
					return d;
				});
		},
		eventByName: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) => data.find((da) => da.name === args.name))
				.then((d) => {
					return d;
				});
		},
		eventByDate: (parent, args) => {
			console.log(args);
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) =>
					data.filter(
						(d) => d.startsAt >= args.startsAt && d.endsAt <= args.endsAt
					)
				)
				.then((d) => {
					console.log(d);
					return d;
				});
		},
		appEvents: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) => data.filter((d) => d.appId === args.appId))
				.then((d) => {
					return d;
				});
		},
	},
	App: {
		appStages: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.apps)
				.then((data) => data.appStages)
				.then((d) => {
					return d;
				});
		},
	},
	Event: {
		stage: (parent, args) => {
			return axios
				.get(URL)
				.then((data) => {
					console.log(data.data.stages);
					return data.data.stages.find((d) => d.id === args.stageId);
				})
				.then((res) => {
					return res;
				});
		},
	},
	Stage: {
		stageEvents: (parent, args) => {
			return axios
				.get(URL)
				.then((res) => res.data.events)
				.then((data) => data.filter((d) => d.stageId === args.id))
				.then((dt) => {
					return dt;
				});
		},
	},
	Mutation: {
		createApp: (parent, args) => {
			let options = {
				headers: {
					'Content-Type': 'plain/text',
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			};
			let body = JSON.stringify(args.input);
			return axios
				.post(URL, body, options)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				})
				.catch((err) => console.log(err));
		},
	},
};

module.exports = { resolvers };
