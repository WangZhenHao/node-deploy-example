const fs = require('fs')
const archiver = require('archiver')
const utils = require('../utils')

function compressFile(config) {
  const _localDirectoryName = utils.directoryName(config.localFilePath)
  const outPutPath = utils.pathResolve(__dirname, '../' + `${utils.seprate}${_localDirectoryName}.zip`)
  const targetDir = config.localFilePath

  return compressFn(outPutPath, targetDir)

}

function compressFn(outPutPath, targetDir) {
  return new Promise((resolve, reject) => {
    console.log('1-正在压缩文件...')
    // 创建文件写入流
    const output = fs.createWriteStream(outPutPath)
    // 设置压缩等级
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    output.on('close', () => {
      console.log('2-压缩完成！共计 ' + (archive.pointer() / 1024 / 1024).toFixed(3) + 'MB\n' +
        '目标目录：' + targetDir + '\n' +
        '输出目录：' + outPutPath
      )
      resolve({ outPutPath, targetDir })
    }).on('error', (err) => {
      reject(console.error('压缩失败', err))
    })
    // 管道存档数据到文件
    archive.pipe(output)
    /**
     * 1：压缩文件路径
     * 2：压缩的目录
     */
    archive.directory(targetDir, '/')
    // 完成文件追加 确保写入流完成
    archive.finalize()
  })
}

module.exports = compressFile