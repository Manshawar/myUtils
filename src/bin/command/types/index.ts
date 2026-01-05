import type { ICommand, ICommandOption } from '@/index';
export class Command implements ICommand {
  public description: string;
  public command: string;
  public options?: ICommandOption[];
  public action: (value?: any, options?: any) => void;
  constructor(
    description: string, 
    command: string, 
    action: (value?: any, options?: any) => void,
    options?: ICommandOption[]
  ) {
    this.description = description
    this.command = command
    this.action = action
    this.options = options
  }
}