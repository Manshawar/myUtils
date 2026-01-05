import type { ICommand } from '@/index';
import { Command } from '../types';
import fs from 'fs-extra';
import { join } from 'path';

export function useOperation(operation: string) {
  return new Command(operation, operation, () => {
    console.log(`${operation}`);
  })
}

// 配置文件路径（当前目录）
const CONFIG_FILE = '.st-ftgo-config.json';

// 读取配置文件
async function readConfig(): Promise<{ basePath?: string }> {
  try {
    return await fs.readJson(CONFIG_FILE);
  } catch {
    return {};
  }
}

// 写入配置文件
async function writeConfig(config: { basePath: string }) {
  await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}

export const operation: ICommand[] = [
  useOperation('fc'),
  new Command(
    'ftgo',
    'ftgo <path|folderName> [--init]',
    async (input?: string, options?: any) => {
      // 检查是否有 --init 选项
      const hasInit = options?.init === true;
      
      if (hasInit) {
        // 初始化模式：保存路径
        if (!input) {
          console.error('❌ 请提供文件夹地址');
          console.log('使用方式: st ftgo <文件夹地址> --init');
          return;
        }
        
        try {
          const basePath = input; // 用户输入的路径
          await writeConfig({ basePath });
          console.log(`✅ 初始化路径已保存: ${basePath}`);
          console.log('现在可以使用 "st ftgo <文件夹名>" 来创建文件夹了');
        } catch (error: any) {
          console.error(`❌ 保存配置失败: ${error.message}`);
        }
      } else {
        // 创建模式：根据初始化路径创建文件夹
        if (!input) {
          console.error('❌ 请提供文件夹名称');
          console.log('使用方式: st ftgo <文件夹名>');
          console.log('提示: 如果还未初始化，请使用 "st ftgo <文件夹地址> --init" 先设置路径');
          return;
        }
        
        try {
          // 读取配置
          const config = await readConfig();
          
          if (!config.basePath) {
            console.error('❌ 未找到初始化路径');
            console.log('请先使用 "st ftgo <文件夹地址> --init" 设置基础路径');
            console.log('例如: st ftgo /Users/username/go-projects --init');
            return;
          }
          
          // 在基础路径下创建新文件夹
          const newFolderPath = join(config.basePath, input);
          
          // 检查文件夹是否已存在
          if (await fs.pathExists(newFolderPath)) {
            console.error(`❌ 文件夹 ${input} 已存在: ${newFolderPath}`);
            return;
          }
          
          // 创建文件夹
          await fs.ensureDir(newFolderPath);
          console.log(`✅ 已创建文件夹: ${newFolderPath}`);
          
          // 创建 main.go 文件
          const mainGoPath = join(newFolderPath, 'main.go');
          const mainGoContent = 'package main\n';
          
          await fs.writeFile(mainGoPath, mainGoContent, 'utf-8');
          console.log(`✅ 已创建文件: ${mainGoPath}`);
          console.log('🎉 初始化完成！');
          
        } catch (error: any) {
          console.error(`❌ 创建失败: ${error.message}`);
        }
      }
    },
    [
      { flags: '--init', description: '初始化模式：设置基础路径' }
    ]
  ),
  // 示例命令：演示选项的使用
  new Command(
    'pizza',
    'pizza',
    async (input?: string, options?: any) => {
      console.log('🍕 Pizza 订单详情:');
      
      if (options.debug) {
        console.log('调试信息:', options);
      }
      
      if (options.small) {
        console.log('- 小尺寸披萨');
      } else if (options.medium) {
        console.log('- 中尺寸披萨');
      } else if (options.large) {
        console.log('- 大尺寸披萨');
      }
      
      if (options.pizzaType) {
        console.log(`- 口味: ${options.pizzaType}`);
      }
      
      if (options.toppings) {
        console.log(`- 配料: ${options.toppings}`);
      }
      
      if (!options.small && !options.medium && !options.large && !options.pizzaType) {
        console.log('提示: 使用 --help 查看可用选项');
        console.log('示例: st pizza --small --pizza-type "Margherita" --toppings "cheese,pepperoni"');
      }
    },
    [
      { flags: '-d, --debug', description: '输出调试信息' },
      { flags: '-s, --small', description: '小尺寸披萨' },
      { flags: '-m, --medium', description: '中尺寸披萨' },
      { flags: '-l, --large', description: '大尺寸披萨' },
      { flags: '-p, --pizza-type <type>', description: '披萨口味' },
      { flags: '-t, --toppings <toppings>', description: '配料（用逗号分隔）' }
    ]
  )
]