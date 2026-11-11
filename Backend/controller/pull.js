import path from "path";
import { promises as fs } from "fs";
import { S3, S3_BUCKET } from "../config/aws-config.js";

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");

  try {
    await fs.mkdir(repoPath, { recursive: true });

    let continuationToken;

    do {
      const data = await S3.listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: "commits/",
        ContinuationToken: continuationToken,
      }).promise();

      const objects = data.Contents ?? [];

      for (const object of objects) {
        const key = object.Key;

        // Skip invalid keys and folder-marker objects
        if (!key || key.endsWith("/")) continue;

        // Keep downloaded files inside .apnaGit
        const filePath = path.resolve(repoPath, key);

        if (!filePath.startsWith(repoPath + path.sep)) {
          throw new Error(`Invalid S3 object key: ${key}`);
        }

        // Download the actual object data
        const fileData = await S3.getObject({
          Bucket: S3_BUCKET,
          Key: key,
        }).promise();

        // Create the destination directory
        await fs.mkdir(path.dirname(filePath), {
          recursive: true,
        });

        // Write the downloaded file
        await fs.writeFile(filePath, fileData.Body);

      }

      continuationToken = data.IsTruncated
        ? data.NextContinuationToken
        : undefined;

    } while (continuationToken);

    console.log("All commits pulled from S3 successfully");
  } catch (error) {
    console.error("Error while pulling from S3 Bucket:", error);
    throw error;
  }
}

export { pullRepo };

