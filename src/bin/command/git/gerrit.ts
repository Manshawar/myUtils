import type { ICommand } from '@/index';
import { getBranch, pushBranch } from '@utils/git';
export const gerrit: ICommand[] = [{
  description: 'gerrit push ',
  command: 'grp',
  action:async () => {
    const branches = await getBranch();
    await pushBranch('HEAD:refs/for/' + branches.current);
    console.log('HEAD:refs/for/' + branches.current);

  }
}]