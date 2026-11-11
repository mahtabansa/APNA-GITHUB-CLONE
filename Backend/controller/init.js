import { config } from "dotenv";
config();

import { promises as fs } from "fs";
import path from "path";

async function initRepo() {
  const repopath = path.resolve(process.cwd(), ".apnaGit");
  const commitPath = path.join(repopath, "commits");

  try {
    await fs.mkdir(repopath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });

    await fs.writeFile(
      path.join(repopath, "config.json"),
      JSON.stringify({bucket: process.env.BUCKET_S30})
    );

  } catch (error) {
    console.error("Error initializing repository", error);
  }
}

export { initRepo };