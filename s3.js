import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { S3_BUCKET, S3_REGION,ACCESS_KEY, SECRET_ACCESS_KEY } from '@env';

// Remove extra quotes from environment variables
const accessKeyId = ACCESS_KEY.replace(/['"]+/g, '');
const secretAccessKey = SECRET_ACCESS_KEY.replace(/['"]+/g, '');

// Configure AWS SDK
const cfg = {
  region: S3_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
};

// Debugging: Log AWS SDK configuration
//console.log(cfg);

// get a recording file from S3 storage
async function getRecordingFile(filename) {
  // Get object from S3
  const params = {
    Bucket: S3_BUCKET,
    Key: `recordings/${filename}`,
  };

  const client = new S3Client(cfg);
  const { Body } = await client.send(new GetObjectCommand(params));

  // console.log(await Body.transformToString());
  return Body;
}

// upload a recording file to S3
export async function uploadRecordingFile(file) {
  // Read the file content using expo-file-system
  
  const fileUri = file.assets[0].uri;

  let fileContent;
  try {
    console
    fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
  const buffer = Buffer.from(fileContent, 'base64');

  console.log("hi");
  const params = {
    Bucket: S3_BUCKET,
    Key: `recordings/${file.assets[0].name}`,
    Body: buffer,
    ContentType: file.mimeType,
  };

  console.log("hi");
  console.log(cfg);
  const client = new S3Client(cfg);
  console.log("hi");
  const res = new Upload({ client, params });
  res.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await res.done();
}