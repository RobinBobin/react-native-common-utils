const fs = require("fs");
const path = require("path");
const readline = require("readline");

const decorators6 = {
   package: "babel-plugin-transform-decorators-legacy",
   babelrc: '"transform-decorators-legacy"'
};

const decorators7 = {
   package: "@babel/plugin-proposal-decorators"
};

decorators7.babelrc = `["${decorators7.package}", { "legacy": true }]`;

function pleaseInstall(decorators, prefix, version, postfix) {
   console.log(`${prefix}lease install '${decorators.package}${!!version ? "@" + version : ""}'${postfix ? " " + postfix : ""} and add ${decorators.babelrc} to the plugins array of your .babelrc.`);
   
   console.log();
}

function fallback() {
   pleaseInstall(decorators7, "If you're using React Native >= 0.56.0, p", null, "of the version specified in the React Native release notes (7.0.0-beta.47 for React Native 0.56.0)");
   
   pleaseInstall(decorators6, "For lower RN versions p");
}

function onError(error) {
   console.error(error);
   
   console.log();
   
   fallback();
}

function getVersion(projectPath, directory, key, description, callback) {
   const packageJson = fs.readFileSync(path.join(projectPath, directory, "package.json"), "utf8");
   
   let index = packageJson.indexOf(key);
   let index2 = index == -1 ? -1 : packageJson.indexOf('"', index + key.length);
   
   if (index2 != -1) {
      index = index2 + 1;
      index2 = packageJson.indexOf('"', index);
   }
   
   if (index2 == -1) {
      throw new Error(`Failed to determine the ${description} version.`);
   }
   
   const version = packageJson.substring(index, index2);
   
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
   });
   
   rl.question(`${description} version is determined as "${version}". Is that correct (y/n) ? `, answer => {
         rl.close();
         
         console.log();
         
         answer == "y" ? callback(version, projectPath) : fallback();
   });
}

function rnVersionDetermined(rnVersion, projectPath) {
   if (rnVersion.localeCompare("0.56.0") < 0) {
      pleaseInstall(decorators6, "P");
   } else {
      try {
         getVersion(projectPath, path.join("node_modules", "@babel", "core"), '"version":', "@babel core", version => {
            pleaseInstall(decorators7, "P", version);
         });
      } catch (error) {
         onError(error);
      }
   }
}

try {
   const index = __dirname.indexOf("node_modules");
   
   if (index == -1) {
      throw new Error("Failed to determine the current project path.");
   }
   
   const projectPath = __dirname.substring(0, index);
   
   getVersion(projectPath, "", '"react-native":', "React Native", rnVersionDetermined);
} catch (error) {
   onError(error);
}
