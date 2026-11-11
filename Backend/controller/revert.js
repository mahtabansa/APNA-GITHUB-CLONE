import fs from 'fs'
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {

    const repoPath = path.resolve(process.cwd(),".apnaGit");
    const commitPath = path.join(repoPath,"commits");
try {

    const commitDir = path.join(commitPath,commitID);
    const parentDir = path.resolve(repoPath,"..");

    const files = await readdir(commitDir);
    for(const file of files){
        await copyFile(path.join(commitDir,file),path.join(parentDir,file))
    }
  

}catch(err){
    console.error("Unable to revert : ",err);
}
   
}
export {revertRepo}