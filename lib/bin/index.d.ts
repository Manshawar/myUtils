#!/usr/bin/env node
interface ICommand {
    description: string;
    command: string;
    action: (value?: any) => void;
}
interface IOption {
    command: string;
    value: ((value?: any) => string) | string;
}
declare const commandConfig: ICommand[];

export { type ICommand, type IOption, commandConfig };
