#!/usr/bin/env node

import * as path from "path";
import { fileURLToPath } from 'url';
import alias from "module-alias";
import { Command } from 'commander';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
alias(path.resolve(__dirname, "../../"));
import optionsConfig from './command/options/index'
import commandConfig from './command/index.ts';

export interface IOption {
  command: string
  value: ((value?: any) => string) | string
}

export interface ICommandOption {
  flags: string  // 例如: '-d, --debug' 或 '--init'
  description?: string  // 选项描述
}

export interface ICommand {
  description: string
  command: string
  options?: ICommandOption[]  // 命令选项数组
  action: (value?: any, options?: any) => void
}

async function init() {
  // 使用动态 import 导入 package.json
  const packageConfig = (await import('../../package.json')).default;
  const program = new Command(packageConfig.commandName);

  const initOptions = (optionsConfig: IOption[]) => {
    optionsConfig.forEach(config => {
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
      const { description, command, options, action } = config
      const cmd = program
        .command(command)
        .description(description)

      // 为命令添加选项
      if (options && options.length > 0) {
        options.forEach(opt => {
          cmd.option(opt.flags, opt.description || '')
        })
      }

      cmd.action((...args) => {
        // commander.js v14 中，action 回调的最后一个参数是 command 对象
        const command = args[args.length - 1]
        const value = args[0]
        // 通过 command.opts() 获取选项对象
        const options = command?.opts ? command.opts() : {}
        action(value, options)
      })
    })
  }

  initOptions(optionsConfig);
  initCommand(commandConfig);
  program.version(packageConfig.version, '-v, --vers', 'output the current version');
  program.parse(process.argv);
}

init().catch(console.error);