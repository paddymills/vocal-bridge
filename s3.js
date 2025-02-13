import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";
import "dotenv/config";

// Configure AWS SDK
const cfg = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
};

// get a recording file from S3 storage
async function getRecordingFile(filename) {
  // Get object from S3
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `recordings/${filename}`,
  };

  const client = new S3Client(cfg);
  const { Body } = await client.send(new GetObjectCommand(params));

  // console.log(await Body.transformToString());
  return Body;
}

// upload a recording file to S3
async function recordingRecordingFile(filename) {
  // Save object to S3
  const fileStream = createReadStream(filename);
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `recordings/${filename}`,
    Body: fileStream,
  };

  const client = new S3Client(cfg);
  const res = new Upload({ client, params });
  res.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await res.done();
}
