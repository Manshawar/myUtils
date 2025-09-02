import type { ICommand } from '@/index';
import { gerrit } from './gerrit';
import * as handler from './handler';
const handlerList = Object.values(handler)
export const git: ICommand[] = [
 ...gerrit,
 ...handlerList
]