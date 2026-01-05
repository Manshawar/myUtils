import type { ICommand } from '@/index';
import { getBranch, pushBranch, gitInstance } from '@utils/git';
import { Command } from '../types';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const gerrit: ICommand[] = [new Command(
  'gerrit push ',
  'grp',
  async () => {
    const branches = await getBranch();
    await pushBranch('HEAD:refs/for/' + branches.current);
    console.log('HEAD:refs/for/' + branches.current);
    await gitInstance.push();
  }
), new Command(
  'serve',
  'sv',
  async () => {
    const cwd = process.cwd();
    try {
      // 检测当前 Node.js 版本
      console.log('检测 Node.js 版本...');
      const { stdout: nodeVersion } = await execAsync('node -v', { cwd });
      const version = nodeVersion.trim();
      const majorVersion = version.match(/v(\d+)/)?.[1];
      
      console.log(`当前 Node.js 版本: ${version}`);
      
      // 构建命令：如果不是 14，先切换版本，然后执行 npm run serve
      // 在同一个 shell 会话中执行，确保环境变量生效
      let command = '';
      if (majorVersion !== '14') {
        console.log('切换到 Node.js 14...');
        command = 'eval "$(fnm env --use-on-cd)" && fnm use 14 && npm run serve';
      } else {
        console.log('当前已是 Node.js 14，直接启动...');
        command = 'npm run serve';
      }
      
      // 执行命令
      console.log('启动开发服务器...');
      const child = spawn('zsh', ['-c', command], {
        cwd,
        stdio: 'inherit', // 继承父进程的 stdio，直接输出到终端
        env: process.env
      });
      
      // 处理进程退出
      child.on('error', (error) => {
        console.error(`启动失败: ${error.message}`);
      });
      
      child.on('exit', (code) => {
        if (code !== 0 && code !== null) {
          console.error(`进程退出，代码: ${code}`);
        }
      });
      
    } catch (error: any) {
      console.error(`执行失败: ${error.message}`);
      if (error.stdout) console.log(error.stdout);
      if (error.stderr) console.error(error.stderr);
    }
  }
)]