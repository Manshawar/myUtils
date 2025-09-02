import type { ICommand } from '@/index';
import { getBranch, pushBranch } from '@utils/git';
import { Command } from './class';
export const gerrit: ICommand[] = [new Command(
  'gerrit push ',
  'grp',
  async () => {
    const branches = await getBranch();
    await pushBranch('HEAD:refs/for/' + branches.current);
    console.log('HEAD:refs/for/' + branches.current);

  }
)]