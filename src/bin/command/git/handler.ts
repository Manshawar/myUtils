import { getBranch, checkBranch, commit, add } from '@utils/git';
import { Command } from './class';
import type { ICommand } from '@/index';
import { commitHead } from './common';
export const checkBranchHandler: ICommand = new Command(
  'git checkout ',
  'gc <branch>',
  async (branchName?: string) => {
    if (branchName) {
      try {
        console.log(`切换到分支: ${branchName}`);
        await checkBranch(branchName);
      } catch (error) {
        console.error('切换分支失败:', error);
      }
      // 这里可以添加实际的切换分支逻辑
    } else {
      console.log('请提供分支名称');
    }
  }
)
export const getBranchHandler: ICommand = new Command(
  'git branch ',
  'gb',
  () => {
    console.log('本地分支列表：');
    getBranch().then(branches => {
      branches.all.forEach((branch, index) => {
        console.log(`${index + 1}. ${branch}`);
      });
    });
  }
)
export const getAddHandler: ICommand = new Command(
  'git add ',
  'ga',
  () => {
    console.log('添加代码');
    add();
  }
)
export const getCommitHandler: ICommand = new Command(
  'git commit ',
  'gct <message>',
  async (message?: string) => {
    try {
      console.log('提交代码:', message);
      const res = message?.split(':');
      console.log(commitHead[res?.[0] as string], res?.[1]);
      const messageText = commitHead[res?.[0] as string]+' ' + res?.[1];
      await commit(messageText || '');
    } catch (error) {
      console.error('提交代码失败:', error);
    }
  }
)
