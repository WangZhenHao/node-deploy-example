const node_ssh = require('node-ssh');
const fs = require('fs');
const ssh = new node_ssh();
const runCommand = require('../utils/runCommand.js')

async function uploadFile(config) {
  const connectInfo = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
  }

  try {
    await uploadConnect(connectInfo);
    await uploadFn(config.outPutPath, config.remoteRealyPath)
    await uploadSuccess(config)
  } catch (e) {
    console.log('上传文件模块错误：', e)
  } finally {
    delUploadFile(config.outPutPath)
    ssh.dispose();
  }
}

function uploadSuccess(config) {
  const {
    remoteDirectoryName,
    zipFileName,
    remoteOptionPath
  } = config
  return new Promise((reslove, reject) => {
    runCommand(
      ssh,
      `
    if [ -d ${remoteDirectoryName}_prev ]
      then
        rm -rf ${remoteDirectoryName}_prev
    fi
		if [ -d  ${remoteDirectoryName} ]
      then 
        mv ${remoteDirectoryName} ${remoteDirectoryName}_prev
		fi
    
		unzip ${zipFileName}.zip -d ${zipFileName}
		mv ${zipFileName} ${remoteDirectoryName}
		`,
      remoteOptionPath
    ).then(res => {
      console.log('服务器部署完成!')
      reslove(res)
    }).catch(res => {
      console.log('服务器部署失败!')
      reject(res)
    })
  })
}
function delUploadFile(filePath) {
  fs.unlinkSync(filePath, (res) => {
    console.log(res)
  })
}
// delUploadFile('E:\\my-project\\node-ftp-example\\buildUpload\\testFile.zip')
function uploadFn(localFilePath, remoteFilePath) {
  return new Promise((reslove, reject) => {
    console.log(`上传文件： ${localFilePath}`)

    ssh.putFile(localFilePath, remoteFilePath).then(res => {
      console.log(`上传成功： ${remoteFilePath}`)
      reslove(res)
    }).catch(res => {
      console.log('uploadFn函数错误', res)
      reject(res)
    })
  })

}

function uploadConnect(connectInfo) {
  // Object.assign(connectInfo, {
  //   tryKeyboard: true,
  //   onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
  //     if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
  //       finish([password])
  //     }
  //   }
  // })
  // console.log(connectInfo)
  console.log('开始连接服务器...')
  return new Promise((reslove, reject) => {
    ssh.connect(connectInfo).then(res => {
      console.log('连接成功！开始上传文件...');
      reslove(res)
    }).catch(res => {
      console.log('uploadConnect函数错误，连接失败！')
      reject(res)
    })
  })
}


module.exports = uploadFile;