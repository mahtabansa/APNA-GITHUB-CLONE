import { configDotenv } from 'dotenv';
configDotenv();
import aws from 'aws-sdk'
aws.config.update({region:"ap-southeast-2"});

const S3 = new aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.AWS_REGION
});
const S3_BUCKET = "apnabucketgit";

export {S3,S3_BUCKET}