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
      name: "yhr",
      version: "1.0.0",
      description: "",
      main: "index.js",
      commandName: "yhr",
      bin: {
        yhr: "lib/bin/index.js"
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
        "@types/node": "^24.3.0",
        tsup: "^8.5.0"
      },
      dependencies: {
        commander: "^14.0.0",
        "module-alias": "^2.2.3",
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
import { Command } from "commander";
var packageConfig = (await Promise.resolve().then(() => __toESM(require_package(), 1))).default;
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
alias(path.resolve(__dirname, "../../"));
var program = new Command(packageConfig.commandName);
var commandConfig = [
  {
    description: "test",
    command: "test",
    action: () => {
      console.log("test");
    }
  },
  {
    description: "version",
    command: "v",
    action: () => {
      console.log(packageConfig.version);
    }
  },
  {
    description: "gerrit push ",
    command: "grp",
    action: () => {
    }
  }
];
var optionsConfig = [
  {
    command: "-a",
    value: (value) => {
      return packageConfig.version;
    }
  }
];
var initOptions = (commandConfig2) => {
  commandConfig2.forEach((config) => {
    const { command, value } = config;
    if (typeof value === "function") {
      program.option(command, value());
    } else {
      program.option(command, value);
    }
  });
};
var initCommand = (commandConfig2) => {
  commandConfig2.forEach((config) => {
    const { description, command, action } = config;
    program.description(description).command(command).action((value) => {
      action(value);
    });
  });
};
var init = () => {
  initOptions(optionsConfig);
  initCommand(commandConfig);
  program.version(packageConfig.version, "-v, --vers", "output the current version");
};
init();
program.parse(process.argv);
export {
  commandConfig
};
//# sourceMappingURL=index.js.map