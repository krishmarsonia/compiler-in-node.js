import path from "path"
import fs from "fs"
import {exec} from "child_process"

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

export const executeGoCode = (filePath: string, codeId: string) => {
    const baseFileName = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, baseFileName);
    const codesPath = path.join(__dirname, "codes", codeId)

    return new Promise((resolve, reject) => {
        exec(`cd ${codesPath} && go mod init ${codeId} && go mod tidy`)
        exec(`cd ${codesPath} && go build -o ${outputPath} && cd ../.. && cd outputs && ${codeId}.exe`, (error, stdout, stderr) => {
            // error && reject({error, stderr});
            // stderr && reject(stderr);
            // resolve(stdout);
            if(error){
                console.log("error",error);
                reject({error, stderr});
            }else if(stderr){
                console.log("stderr",stderr);
                reject(stderr);
            }else{
                console.log("stdout",stdout);
                resolve(stdout);
            }
        })
    })
}