import { getInput, setOutput, setFailed } from '@actions/core';
import { Octokit } from "@octokit/rest";
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

const createCheckRun = () => new Promise((resolve, reject) => {
    console.log("Creating check run...");
    const GITHUB_TOKEN = getInput('GITHUB_TOKEN');

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    console.log("Github info: " + JSON.stringify(github.context));

    var payload = {
        "owner": github.cotext.payload.repository.owner.login,
        "repo": github.context.payload.repository.name,
        "head_sha": github.context.sha,
        "status": "in_progress",
        "output": {
            "title": "Created check-run!",
            "summary": "This is a summary!"
        }
    };

    console.log("Payload: " + JSON.stringify(payload));
    
//     octokit.checks.create({
//         owner,
// repo,
// name,
// head_sha,
// output.title,
// output.summary,
// output.annotations[].path,
// output.annotations[].start_line,
// output.annotations[].end_line,
// output.annotations[].annotation_level,
// output.annotations[].message,
// output.images[].alt,
// output.images[].image_url,
// actions[].label,
// actions[].description,
// actions[].identifier
//       })
});

export const main = async () => {
    try {
        await createCheckRun();
        // Get the JSON webhook payload for the event that triggered the workflow
        // console.log("Run ID: " + github.run_id);
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);

        const name = getInput('NAME');
        const token = getInput('GITHUB_TOKEN');
        const APP_ID = getInput('APP_ID');
        const INSTALLATION_ID = getInput('INSTALLATION_ID');

        console.log("Token: " + token.slice(0, 20));
        console.log("Token: " + token.slice(20, token.length));

        console.log("APP_ID: " + APP_ID.slice(0, 3));
        console.log("APP_ID: " + APP_ID.slice(3, APP_ID.length));

        console.log("INSTALLATION_ID: " + INSTALLATION_ID.slice(0, 3));
        console.log("INSTALLATION_ID: " + INSTALLATION_ID.slice(3, INSTALLATION_ID.length));


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
