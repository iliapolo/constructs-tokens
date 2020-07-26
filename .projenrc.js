const { JsiiProject } = require('projen');

const project = new JsiiProject({
  "authorName": "Eli Polonsky",
  "authorEmail": "eli.polonsky@gmail.com",
  "name": "constructs-tokens",
  "repository": "https://github.com/iliapolo/constructs-tokens"
});

project.synth();
