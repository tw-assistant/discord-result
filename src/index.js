const core = require("@actions/core");
const axios = require("axios");

const webhook = core.getInput("webhook");

if (!webhook) {
  core.error("Could not parse webhook string value");
  process.exit(0);
}

const github = core.getInput("github");

if (!github) {
  core.error("Could not parse github string value");
  process.exit(0);
}

const needs = core.getInput("needs");

if (!needs) {
  core.error("Could not parse webhook string value");
  process.exit(0);
}

const { workflow, repository } = JSON.parse(github);

const resultIcons = {
  success: ":white_check_mark:",
  failure: ":x:",
  skipped: ":wave:",
  cancelled: ":octagonal_sign:",
};

let content = `${workflow} result:\n`;
const _needs = JSON.parse(needs);
Object.keys(_needs).forEach((job) => {
  content += `${resultIcons[_needs[job].result]} ${job} job\n`;
});
content += `\nRepository: ${repository}`;

axios.post(webhook, { content });
