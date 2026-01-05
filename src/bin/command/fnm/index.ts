import type { ICommand } from '@/index';
import { Command } from '../types';
import { exec } from 'child_process';
export function useFnm(version: string | number) {
  version = version.toString();
 return new Command(
  `fnm use ${version}`,
  version,
  () => {
    console.log(`use ${version}`);
    execFnm(version as string);
  }
 )
 function execFnm(version: string) {
  exec(`fnm use ${version}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  });
 }
}
export const fnm: ICommand[] = Array.from({ length: 10 }, (_, i) => useFnm(i + 12));