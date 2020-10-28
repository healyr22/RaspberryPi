#!/bin/sh
set -e

# INPUT_FORCE=${INPUT_FORCE:-false}
# INPUT_TAGS=${INPUT_TAGS:-false}
# INPUT_DIRECTORY=${INPUT_DIRECTORY:-'.'}
# _FORCE_OPTION=''
# REPOSITORY=${INPUT_REPOSITORY:-$GITHUB_REPOSITORY}

# echo "Push to branch $INPUT_BRANCH";
# [ -z "${INPUT_GITHUB_TOKEN}" ] && {
#     echo 'Missing input "github_token: ${{ secrets.GITHUB_TOKEN }}".';
#     exit 1;
# };

# if ${INPUT_FORCE}; then
#     _FORCE_OPTION='--force'
# fi

# if ${INPUT_TAGS}; then
#     _TAGS='--tags'
# fi

# cd ${INPUT_DIRECTORY}

# remote_repo="https://${GITHUB_ACTOR}:${INPUT_GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

# git push "${remote_repo}" HEAD:${INPUT_BRANCH} --follow-tags $_FORCE_OPTION $_TAGS;


INPUT_NAME=${INPUT_NAME:-'???'}
echo "Script Got $INPUT_NAME";

ls

git status

sudo npm -g install codeowners-generator

codeowners-generator generate

git status

echo "DONE";

if [ -z "$(git status --porcelain)" ]; then 
  # Working directory clean
  export RESULT=0
else 
  # Uncommitted changes
  export RESULT=-1
fi
