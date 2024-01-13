import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class S3 {
	#region = process.env.OC_REGION;

	#namespace = process.env.OC_NAMESPACE;

	#bucketName = process.env.OC_BUCKET;

	#_client;

	constructor() {
		this.#_client = new S3Client( {
			credentials: {
				accessKeyId: process.env.OC_ACCESS_KEY_ID,
				secretAccessKey: process.env.OC_ACCESS_KEY_SECRET,
			},
			region: this.#region,
			forcePathStyle: true,
			endpoint: `https://${this.#namespace}.compat.objectstorage.${this.#region}.oraclecloud.com`,
		} );
	}

	async getObject(path, object) {
		try {
			const command = new GetObjectCommand( {
				Bucket: this.#bucketName,
				Key: `${path}/${object}`,
			} );
			
			const { Body, ContentType } = await this.#_client.send(command);
			
			return {
				data: Body,
				meta: {
					ContentType,
				},
			};
		} catch (err) {
			return {
				data: null,
			};
		}
	}
}
