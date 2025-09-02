#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "st",
      version: "1.0.0",
      description: "",
      main: "index.js",
      commandName: "st",
      bin: {
        st: "lib/bin/index.js"
      },
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        dev: "tsup --watch",
        build: "tsup"
      },
      files: [
        "lib"
      ],
      type: "module",
      keywords: [],
      author: "",
      license: "ISC",
      packageManager: "pnpm@10.14.0",
      devDependencies: {
        "@types/module-alias": "^2.0.4",
        "@types/node": "^24.3.0",
        tsup: "^8.5.0"
      },
      dependencies: {
        commander: "^14.0.0",
        "module-alias": "^2.2.3",
        "simple-git": "^3.28.0",
        typescript: "^5.9.2"
      },
      _moduleAliases: {
        "@": "./src/bin/"
      }
    };
  }
});

// src/bin/index.ts
import * as path from "path";
import { fileURLToPath } from "url";
import alias from "module-alias";
import { Command as Command2 } from "commander";

// src/bin/command/options/index.ts
var options_default = [
  {
    command: "-a",
    value: () => {
      return "\u5360\u4F4D";
    }
  }
];

// src/utils/git.ts
import { simpleGit } from "simple-git";
var options = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false
};
var gitInstance = simpleGit(options);
var getBranch = async () => {
  const branches = await gitInstance.branch();
  return branches;
};
var pushBranch = async (branch) => {
  await gitInstance.push("origin", branch);
};
var checkBranch = async (branch) => {
  await gitInstance.checkout(branch);
  const currentBranch = await getBranch();
  console.log("currentBranch", currentBranch.current);
  return currentBranch.current;
};
var add = async () => {
  await gitInstance.add(".");
};
var commit = async (message) => {
  await gitInstance.commit(message);
};

// src/bin/command/git/gerrit.ts
var gerrit = [{
  description: "gerrit push ",
  command: "grp",
  action: async () => {
    const branches = await getBranch();
    await pushBranch("HEAD:refs/for/" + branches.current);
    console.log("HEAD:refs/for/" + branches.current);
  }
}];

// src/bin/command/git/handler.ts
var handler_exports = {};
__export(handler_exports, {
  checkBranchHandler: () => checkBranchHandler,
  getAddHandler: () => getAddHandler,
  getBranchHandler: () => getBranchHandler,
  getCommitHandler: () => getCommitHandler
});

// src/bin/command/git/class.ts
var Command = class {
  description;
  command;
  action;
  constructor(description, command2, action) {
    this.description = description;
    this.command = command2;
    this.action = action;
  }
};

// src/bin/command/git/common.ts
var commitHead = {
  f: "feat:",
  x: "fix:",
  c: "chore:",
  p: "perf:"
};

// src/bin/command/git/handler.ts
var checkBranchHandler = new Command(
  "git checkout ",
  "gc <branch>",
  async (branchName) => {
    if (branchName) {
      try {
        console.log(`\u5207\u6362\u5230\u5206\u652F: ${branchName}`);
        await checkBranch(branchName);
      } catch (error) {
        console.error("\u5207\u6362\u5206\u652F\u5931\u8D25:", error);
      }
    } else {
      console.log("\u8BF7\u63D0\u4F9B\u5206\u652F\u540D\u79F0");
    }
  }
);
var getBranchHandler = new Command(
  "git branch ",
  "gb",
  () => {
    console.log("\u672C\u5730\u5206\u652F\u5217\u8868\uFF1A");
    getBranch().then((branches) => {
      branches.all.forEach((branch, index) => {
        console.log(`${index + 1}. ${branch}`);
      });
    });
  }
);
var getAddHandler = new Command(
  "git add ",
  "ga",
  () => {
    console.log("\u6DFB\u52A0\u4EE3\u7801");
    add();
  }
);
var getCommitHandler = new Command(
  "git commit ",
  "gct <message>",
  async (message) => {
    try {
      console.log("\u63D0\u4EA4\u4EE3\u7801:", message);
      const res = message?.split(":");
      console.log("res", commitHead[res?.[0]], res?.[1]);
      const messageText = commitHead[res?.[0]] + res?.[1];
      await commit(messageText || "");
    } catch (error) {
      console.error("\u63D0\u4EA4\u4EE3\u7801\u5931\u8D25:", error);
    }
  }
);

// src/bin/command/git/index.ts
var handlerList = Object.values(handler_exports);
var git = [
  ...gerrit,
  ...handlerList
];

// src/bin/command/index.ts
var command = [
  ...git
];
var command_default = command;

// src/bin/index.ts
var packageConfig = (await Promise.resolve().then(() => __toESM(require_package(), 1))).default;
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
alias(path.resolve(__dirname, "../../"));
var program = new Command2(packageConfig.commandName);
var initOptions = (commandConfig) => {
  commandConfig.forEach((config) => {
    const { command: command2, value } = config;
    if (typeof value === "function") {
      program.option(command2, value());
    } else {
      program.option(command2, value);
    }
  });
};
var initCommand = (commandConfig) => {
  commandConfig.forEach((config) => {
    const { description, command: command2, action } = config;
    program.description(description).command(command2).action((value) => {
      action(value);
    });
  });
};
var init = () => {
  initOptions(options_default);
  initCommand(command_default);
  program.version(packageConfig.version, "-v, --vers", "output the current version");
};
init();
program.parse(process.argv);
//# sourceMappingURL=index.js.map