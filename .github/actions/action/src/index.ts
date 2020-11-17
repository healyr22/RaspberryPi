import { getInput, setOutput, setFailed } from '@actions/core';
import { Octokit } from "@octokit/rest";
import { generateCommand } from 'codeowners-generator';
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

const github = require('@actions/github');

type statusType =
| "in_progress" | "completed";
type conclusionType =
| "success" | "failure";

const start = async () => {
    console.log("Creating check run...");
    console.log("GOT: " + process.env.GITHUB_CONTEXT);
    const GITHUB_TOKEN = getInput('githubToken');

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    const status : statusType = "in_progress"

    var payload = {
        "name": "CODEOWNERS Check",
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
    const GITHUB_TOKEN = getInput('githubToken');
 
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
        await generateCommand({parent:{}});

        console.log("Called codeowners - check if any change");

        const result = await git.status();

        if(result.isClean()) {
            console.log("CODEOWNERS ok!");
            await finish("success");
        } else {
            console.log("Need to fix codeowners");
            await finish("failure");
        }
    } catch(e) {
        console.error(e);
    }
};

export const main = async () => {
    // Test if can do other way
    // console.log("GOT: " + JSON.parse(process.env.GITHUB_CONTEXT));
    // console.log("GOT: " + process.env.GITHUB_CONTEXT);
    var context = JSON.parse(process.env.GITHUB_CONTEXT);


    console.log("Old: " + github.context.payload.repository.owner.login);
    console.log("New: " + context.repository_owner);

    console.log("Old: " + github.context.payload.repository.name);
    console.log("New: " + JSON.stringify(context.event.repository.name));

    console.log("Old: " + github.context.sha);
    console.log("New: " + JSON.stringify(context.sha));

    
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
