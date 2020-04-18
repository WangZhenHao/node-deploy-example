# 使用node的sftp一键部署前端静态资源到服务器

config.js里面添加配置

```
const config = {
  dev: {
    // 主机ip
    host: 'xxxx',
    // 端口
    port: '22',
    // 用户名
    user: 'root',
    // 密码
    password: '',
    // 本地打包的目录
    localFilePath: 'E:\\my-project\\node-ftp-example\\testFile',
    // 上传到服务器路径
    remoteFilePath: '/home/testwww/www'
  },
  build: {
    host: 'xxxx',
    port: '22',
    user: 'root',
    password: '',
    localFilePath: 'E:\\my-project\\node-ftp-example\\testFile',
    remoteFilePath: '/home/testwww/www'
  }
}

```

```
// 安装依赖
npm install

// 执行sftp上传，--dev为指定的环境,
// 就会执行 node ./buildUplaod/index.js --dev
npm run deploy

```

