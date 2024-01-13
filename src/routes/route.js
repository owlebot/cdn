import { Readable } from "node:stream";

import express from "express";

export const route = (path, client) => {
	// eslint-disable-next-line new-cap
	const router = express.Router();
	
	router.get("/:object", async(req, res) => {
		const { data, meta } = await client.getObject(path, req.params.object);
	
		if (!data) {
			res.status(404).send(`Cannot GET /${path}/${req.params.object}`);
			return;
		}

		res.setHeader("Content-Type", meta.ContentType);
		const stream = Readable.from(data);
		stream.pipe(res);
	} );

	return router;
};
