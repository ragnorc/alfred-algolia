"use strict";
const alfy = require("alfy");
const algoliasearch = require("algoliasearch/lite");
const searchClient = algoliasearch(
	"1VBD72NPHP",
	process.env.ALGOLIA_SEARCH_KEY
);
const index = searchClient.initIndex("Main");
let items = [];
index.search(alfy.input, (err, { hits } = {}) => {
	if (err) throw err;
	for (let hit of hits) {
		let route;
		switch (hit.modelName) {
			case "myquery":
				route = `https://app.ragnor.co/queries/${hit.slug}`;
				break;
			case "route":
				route = `https://app.ragnor.co${hit.route}`;
				break;
			default:
				route = `https://app.ragnor.co/${hit.modelName}/${hit.id}`;
				break;
		}
		items.push({
			title: hit.question || hit.fullName || hit.title || hit.name || "",
			subtitle: hit.modelName,
			icon: { path: "./icon.png" },
			arg: route
		});
	}
	alfy.output(items);
});
