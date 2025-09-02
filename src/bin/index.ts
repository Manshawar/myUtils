#!/usr/bin/env node

import * as path from "path";
import { fileURLToPath } from 'url';
import alias from "module-alias";
import { Command } from 'commander';
const packageConfig = (await import("../../package.json")).default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
alias(path.resolve(__dirname, "../../"));
import optionsConfig from './command/options/index'
const program = new Command(packageConfig.commandName);
import commandConfig from './command/index.ts';
export interface IOption {
  command: string
  value: ((value?: any) => string) | string
}
export interface ICommand {
  description: string
  command: string
  action: (value?: any) => void
}
const initOptions = (commandConfig: IOption[]) => {
  commandConfig.forEach(config => {
    const { command, value } = config
    if (typeof value === 'function') {
      program.option(command, value())
    } else {
      program.option(command, value)
    }
  })
}
const initCommand = (commandConfig: ICommand[]) => {
  commandConfig.forEach(config => {
    const { description, command, action } = config
    program
      .description(description)
      .command(command)
      .action((value) => {
        action(value)
      })
  })

}
const init = () => {
  initOptions(optionsConfig)
  initCommand(commandConfig);
  program.version(packageConfig.version, '-v, --vers', 'output the current version');
}
init()
program.parse(process.argv);