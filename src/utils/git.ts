import { simpleGit, CleanOptions } from 'simple-git';
import type { SimpleGitOptions } from 'simple-git';
const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};
export const gitInstance = simpleGit(options);
export const getBranch = async () => {
  const branches = await gitInstance.branch();
  return branches;
}
export const pushBranch = async (branch: string) => {
  await gitInstance.push('origin', branch);
}
export const checkBranch = async (branch: string) => {
  await gitInstance.checkout(branch);
  const currentBranch = await getBranch();
  console.log('currentBranch', currentBranch.current);
  return currentBranch.current;
}
export const add = async () => {
  await gitInstance.add('.');
}
export const commit = async (message: string) => {
  await gitInstance.commit(message);
}