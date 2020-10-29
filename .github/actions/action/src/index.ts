import { getInput, setOutput, setFailed } from '@actions/core';
// import { generateCommand } from 'codeowners-generator';

const github = require('@actions/github');
const spawn = require('child_process').spawn;
const path = require("path");
var err;
var result;

const exec = (cmd, args=[]) => new Promise((resolve, reject) => {
    console.log(`Started: ${cmd} ${args.join(" ")}`)
    const app = spawn(cmd, args, { stdio: 'inherit' });
    app.on('close', code => {
        if(code !== 0 && code !== 1){
            err = new Error(`Invalid status code: ${code}`);
            err.code = code;
            return reject(err);
        };
        result = code;
        return resolve(code);
    });
    app.on('error', reject);
});

export const main = async () => {
    try {
        // Get the JSON webhook payload for the event that triggered the workflow
        // console.log("Run ID: " + github.run_id);
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);

        const name = getInput('NAME');
        const token = getInput('GITHUB_TOKEN');

        console.log("Token: " + token);
        console.log("Token Size: " + token.length);
        console.log("Token: " + token.slice(0, 20));
        console.log("Token: " + token.slice(20, token.length));
        var t = "hi -- " + token + " --";
        console.log("...token: " + t);

        console.log("Got name " + name);
        console.log("Got length " + name.length);

        // const owners = generateCommand({parent:{}});

        // console.log("Called codeowners");

        // console.log("Owners: " + JSON.stringify(owners));

        const result = await exec('bash', [path.join(__dirname, './start.sh')]);
        console.log("Ran script");

        if(result === 0) {
            console.log("CODEOWNERS ok!");
        } else {
            console.log("Need to run codeowners");
            // Create check run
        }


        setOutput('name', name);
    } catch(e) {
        console.error(err);
        console.error(err.stack);
        process.exit(err.code || -1);
    }
};
