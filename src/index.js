
import express from "express";

import { S3 } from "./core/s3-client.js";
import { route } from "./routes/route.js";

const app = express();

// eslint-disable-next-line new-cap
const router = express.Router();

const S3Client = new S3();

router.use("/backgrounds", route("backgrounds", S3Client) );

app.use(router);

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
} );
