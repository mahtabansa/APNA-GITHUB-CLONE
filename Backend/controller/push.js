import {promises as fs } from 'fs';
import path from 'path';
import {S3 ,S3_BUCKET} from '../config/aws-config.js'

async function pushRepo(){

    const repoPath = path.resolve(process.cwd(),".apnaGit");
    const commitsPath = path.join(repoPath,"commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);

        for(const commitDir of commitDirs){
            const commitpath = path.join(commitsPath,commitDir);
            const files = await fs.readdir(commitpath);

            for(const file of files){
                const filePath = path.join(commitpath,file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    Bucket:S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body:fileContent
                }
                await S3.upload(params).promise();
            }

        }
        console.log('all folder and file uploaded to s3');

        
    } catch (error) {
        console.error("Error while pushing on S3 Bucket ",error)
    }

}
export {pushRepo}