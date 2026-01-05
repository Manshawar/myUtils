import { git } from './git/index';
import { fnm } from './fnm/index';
import type { ICommand } from '@/index';
import {operation} from './operation/index';
const command: ICommand[] = [
  ...git,
  ...fnm,
  ...operation
]
export default command;