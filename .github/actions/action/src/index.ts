import { getInput, setOutput, setFailed } from '@actions/core';
import { Octokit } from "@octokit/rest";
import { generateCommand } from 'codeowners-generator';
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

const github = require('@actions/github');
const spawn = require('child_process').spawn;
const path = require("path");

var err;
var result;
type statusType =
| "in_progress" | "completed";
type conclusionType =
| "success" | "failure";

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

const createCheckRun = async () => {
    console.log("Creating check run...");
    const GITHUB_TOKEN = getInput('GITHUB_TOKEN');

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

const status : statusType = "completed"
const conclusion : conclusionType = "failure"

    var payload = {
        "name": "Created!!",
        "owner": github.context.payload.repository.owner.login,
        "repo": github.context.payload.repository.name,
        "head_sha": github.context.sha,
        "status": status,
        "conclusion": conclusion,
        "output": {
            "title": "Created check-run!",
            "summary": "This is a summary!"
        },
        "actions": [{
            "label": "Button text",
            "description": "Some description",
            "identifier": "robs-action"
            }]
    };

    console.log("Payload: " + JSON.stringify(payload));
    
    await octokit.checks.create(payload);
};

const success = async () => {
    console.log("Marking check run successful...");
    const GITHUB_TOKEN = getInput('GITHUB_TOKEN');

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    console.log("Fithub context: " + JSON.stringify(github.context));

    const status : statusType = "completed"
    const conclusion : conclusionType = "success"

    var payload = {
        "name": "Created!!",
        "owner": github.context.payload.repository.owner.login,
        "repo": github.context.payload.repository.name,
        "check_run_id": github.context.payload.check_run.id,
        "head_sha": github.context.sha,
        "status": status,
        "output": {
            "title": "Created check-run!",
            "summary": "This is a summary!"
        },
        "conclusion": conclusion
    };

    console.log("Payload: " + JSON.stringify(payload));
    
    await octokit.checks.update(payload);
};

export const main = async () => {
    const action = getInput("action");

    switch(action) {
        case "CREATE_CHECK":
            // Create the check-run
            createCheckRun();
            break;
        case "SUCCESS":
            success();
    }



    try {
        // createCheckRun();
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

        // const result = await exec('bash', [path.join(__dirname, './start.sh')]);

        await generateCommand({parent: {}});

        const result = await git.status();
        console.log("Ran script");

        if(result.isClean()) {
            console.log("CODEOWNERS ok!");
        } else {
            console.log("Need to run codeowners");
            // Create check run
        }


        setOutput('isValid', result.isClean());
        setOutput('name', "Rob!");
    } catch(e) {
        console.error(err);
        console.error(e);
    }
};
