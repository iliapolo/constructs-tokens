const { JsiiProject } = require('projen');

const project = new JsiiProject({
  "authorName": "Eli Polonsky",
  "authorEmail": "eli.polonsky@gmail.com",
  "name": "@iliapolo/constructs-tokens",
  "repository": "https://github.com/iliapolo/constructs-tokens"
});

project.synth();
