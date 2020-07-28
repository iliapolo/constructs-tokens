const { JsiiProject, Semver } = require('projen');

const project = new JsiiProject({
  authorName: "Eli Polonsky",
  authorEmail: "eli.polonsky@gmail.com",
  name: "constructs-tokens-staging",
  repository: "https://github.com/iliapolo/constructs-tokens",
  dependencies: {
    'constructs': Semver.caret('3.0.4')
  },
  peerDependencies: {
    'constructs': Semver.caret('3.0.4')
  },
  python: {
    distName: 'constructs-tokens-staging',
    module: 'constructs_tokens_staging'
  },
  dotnet: {
    dotNetNamespace: "Org.ConstructsTokensStaging",
    packageId: "Org.ConstructsTokensStaging"
  }

});

project.gitignore.exclude('.vscode/')

project.synth();
