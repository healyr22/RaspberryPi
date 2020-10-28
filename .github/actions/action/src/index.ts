import { getInput, setOutput, setFailed } from '@actions/core';

export const main = async () => {
    const name = getInput('NAME');

    console.log("Got name " + name);

    setOutput('name', name);
};
