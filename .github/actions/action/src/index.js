"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.main = void 0;
var core_1 = require("@actions/core");
var rest_1 = require("@octokit/rest");
var codeowners_generator_1 = require("codeowners-generator");
var simple_git_1 = require("simple-git");
var git = simple_git_1["default"]();
var github = require('@actions/github');
var spawn = require('child_process').spawn;
var path = require("path");
var err;
var result;
var createCheckRun = function () { return __awaiter(void 0, void 0, void 0, function () {
    var GITHUB_TOKEN, octokit, status, conclusion, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Creating check run...");
                GITHUB_TOKEN = core_1.getInput('GITHUB_TOKEN');
                octokit = new rest_1.Octokit({
                    auth: GITHUB_TOKEN
                });
                status = "completed";
                conclusion = "failure";
                payload = {
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
                return [4 /*yield*/, octokit.checks.create(payload)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var success = function () { return __awaiter(void 0, void 0, void 0, function () {
    var GITHUB_TOKEN, octokit, status, conclusion, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Marking check run successful...");
                GITHUB_TOKEN = core_1.getInput('GITHUB_TOKEN');
                octokit = new rest_1.Octokit({
                    auth: GITHUB_TOKEN
                });
                console.log("Fithub context: " + JSON.stringify(github.context));
                status = "completed";
                conclusion = "success";
                payload = {
                    "name": "Success name?",
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
                return [4 /*yield*/, octokit.checks.update(payload)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, token, APP_ID, INSTALLATION_ID, result_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                name_1 = core_1.getInput('NAME');
                token = core_1.getInput('GITHUB_TOKEN');
                APP_ID = core_1.getInput('APP_ID');
                INSTALLATION_ID = core_1.getInput('INSTALLATION_ID');
                console.log("Token: " + token.slice(0, 20));
                console.log("Token: " + token.slice(20, token.length));
                console.log("APP_ID: " + APP_ID.slice(0, 3));
                console.log("APP_ID: " + APP_ID.slice(3, APP_ID.length));
                console.log("INSTALLATION_ID: " + INSTALLATION_ID.slice(0, 3));
                console.log("INSTALLATION_ID: " + INSTALLATION_ID.slice(3, INSTALLATION_ID.length));
                console.log("Got name " + name_1);
                console.log("Got length " + name_1.length);
                // const owners = generateCommand({parent:{}});
                // console.log("Called codeowners");
                // console.log("Owners: " + JSON.stringify(owners));
                // const result = await exec('bash', [path.join(__dirname, './start.sh')]);
                return [4 /*yield*/, codeowners_generator_1.generateCommand({ parent: {} })];
            case 1:
                // const owners = generateCommand({parent:{}});
                // console.log("Called codeowners");
                // console.log("Owners: " + JSON.stringify(owners));
                // const result = await exec('bash', [path.join(__dirname, './start.sh')]);
                _a.sent();
                return [4 /*yield*/, git.status()];
            case 2:
                result_1 = _a.sent();
                console.log("Ran script");
                if (!result_1.isClean()) return [3 /*break*/, 4];
                console.log("CODEOWNERS ok!");
                return [4 /*yield*/, success()];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                console.log("Need to run codeowners");
                // Create check run
                return [4 /*yield*/, createCheckRun()];
            case 5:
                // Create check run
                _a.sent();
                _a.label = 6;
            case 6:
                core_1.setOutput('isValid', result_1.isClean());
                core_1.setOutput('name', "Rob!");
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                console.error(err);
                console.error(e_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
