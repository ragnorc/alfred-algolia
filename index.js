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
		items.push({
			title: hit.question || hit.fullName || hit.title || hit.name || "",
			subtitle: hit.modelName,
			icon: { path: "./icon.png" },
			arg:
				hit.modelName != "Myquery"
					? `https://app.ragnor.co/elements/${hit.modelName.toLowerCase()}/${
							hit.id
					  }`
					: `https://app.ragnor.co/queries/${hit.slug}`
		});
	}
	alfy.output(items);
});
