import type { ICommand } from '@/index';
export class Command implements ICommand {
  public description: string;
  public command: string;
  public action: () => void;
  constructor(description: string, command: string, action: () => void) {
    this.description = description
    this.command = command
    this.action = action
  }
}