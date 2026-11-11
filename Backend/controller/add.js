import { promises as fs } from "fs";
import path from "path";

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const staginPath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(staginPath, { recursive: true });
    const FileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(staginPath, FileName));
    console.log(`file ${FileName} to staging area!`);
  } catch (error) {
    console.error("adding file error ", error);
  }
}
export { addRepo };
