import { git } from './git/index';
import type { ICommand } from '@/index';
const command: ICommand[] = [
  ...git
]
export default command;