const config = require('../config.js');
const normalizeConfig = require('../utils/normalizeConfig.js');
const compressFile = require('./compressFile.js')
const uploadFile = require('./uploadFile.js')
const envParams = process.argv[2]
const env = envParams ? envParams.split('--')[1] : 'dev';
const configuration = normalizeConfig(config[env])



async function toUpload() {
  try {
    const res = await compressFile(configuration)
    configuration.outPutPath = res.outPutPath;
    await uploadFile(configuration)

  } catch (e) {
    console.log(e)
  }
}


module.exports = toUpload