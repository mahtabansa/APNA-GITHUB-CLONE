import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const staggedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");


  try {
    const commitID = uuidv4();
    const commitDir = path.join(commitPath, commitID); // commit directory

    await fs.mkdir(commitDir, { recursive: true }); //ye directory bayega

    const files = await fs.readdir(staggedPath);

    for (const file of files) {
      await fs.copyFile(
        path.join(staggedPath, file),
        path.join(commitDir, file),
      );
    }
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, Date: new Date().toISOString() }),
    );

  } catch (error) {
    console.error("Error while commiting", error);
  }
}
export { commitRepo };
