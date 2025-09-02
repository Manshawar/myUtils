#!/usr/bin/env node
interface IOption {
    command: string;
    value: ((value?: any) => string) | string;
}
interface ICommand {
    description: string;
    command: string;
    action: (value?: any) => void;
}

export type { ICommand, IOption };
