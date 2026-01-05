这是一个简单的命令行工具

目前主要封装了一些日常使用的脚本的功能 根据个人习惯进行处理

git的命令太长了 简化一下

需要安装fnm 它是用来支持切换版本的工具 

```ts
export const commitHead:Record<string, string> = {
  f: 'feat:',
  x: 'fix:',
  c: 'chore:',
  p: 'perf:',
}
```

| 命令                 | 功能                                                   |
| -------------------- | ------------------------------------------------------ |
| st gc `<branch>`   | 切换分支                                               |
| st gb                | 查看本地分支列表                                       |
| st ga                | git add .                                              |
| st gct `<message>` | 提交 需要注意格式 前面得加<br />commitHead文本如f:init |
| st grp               | gerrit 的提交                                          |
