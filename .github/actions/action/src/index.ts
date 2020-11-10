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

const start = async () => {
    console.log("Creating check run...");
    const GITHUB_TOKEN = getInput('GITHUB_TOKEN');

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    const status : statusType = "in_progress"

    var payload = {
        "name": "Checking CODEOWNERS",
        "owner": github.context.payload.repository.owner.login,
        "repo": github.context.payload.repository.name,
        "head_sha": github.context.sha,
        "status": status,
        "output": {
            "title": "Checking CODEOWNERS",
            "summary": "This check ensures the root CODEOWNERS file was updated to reflect any nested CODEOWNERS files."
        }
    };

    console.log("Payload: " + JSON.stringify(payload));
    
    await octokit.checks.create(payload);
};

const finish = async (conclusion: conclusionType) => {
    console.log("Marking check run successful...");
    const GITHUB_TOKEN = getInput('GITHUB_TOKEN');
 
    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    console.log("Github context: " + JSON.stringify(github.context));

    const status : statusType = "completed"

    var payload;
    switch(conclusion) {
        case "success":
            payload = {
                "owner": github.context.payload.repository.owner.login,
                "repo": github.context.payload.repository.name,
                "check_run_id": github.context.payload.check_run.id,
                "status": status,
                "output": {
                    "title": "CODEOWNERS Correct!",
                    "summary": "This check ensures the root CODEOWNERS file was updated to reflect any nested CODEOWNERS files."
                },
                "conclusion": conclusion
            };
            break;
        case "failure":
            payload = {
                "owner": github.context.payload.repository.owner.login,
                "repo": github.context.payload.repository.name,
                "check_run_id": github.context.payload.check_run.id,
                "status": status,
                "output": {
                    "title": "Missing CODEOWNERS Changes",
                    "summary": "Looks like the root CODEOWNERS file has not been updated to reflect nested CODEOWNERS changes. Please run `codeowners-generator generate` and commit to fix."
                },
                "conclusion": conclusion
            };
            break;
    }

    console.log("Payload: " + JSON.stringify(payload));
    
    await octokit.checks.update(payload);
};

const checkCodeOwners = async () => {
    console.log("Checking codeowners...");
    try {
        // Check if CODEOWNERS file is correct by running codeowners-generator and ensuring no changes

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

        const owners = await generateCommand({parent:{}});

        console.log("Called codeowners");

        console.log("Owners: " + JSON.stringify(owners));

        // const result = await exec('bash', [path.join(__dirname, './start.sh')]);

        const result = await git.status();
        console.log("Ran script");

        if(result.isClean()) {
            console.log("CODEOWNERS ok!");
            await finish("success");
        } else {
            console.log("Need to run codeowners");
            await finish("failure");
        }


        setOutput('isValid', result.isClean());
        setOutput('name', "Rob!");
    } catch(e) {
        console.error(err);
        console.error(e);
    }
};

export const main = async () => {
    const action = getInput('action');
    switch(action) {
        case "START":
            await start();
            break;
        case "CHECK_CODEOWNERS":
            await checkCodeOwners();
            break;
        default:
            throw new Error("Invalid action - " + action);
    }
};
