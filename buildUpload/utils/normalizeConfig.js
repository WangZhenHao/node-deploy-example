const utils = require('./index')
function normalizeConfig(config) {
  const seprate = utils.seprate;
  const localDirectoryArr = config.localFilePath.split(seprate);
  const zipFileName = localDirectoryArr
  [localDirectoryArr.length - 1]

  const remoteDirectoryArr = config.remoteFilePath.split('/')
  const remoteDirectoryName = remoteDirectoryArr[remoteDirectoryArr.length - 1]
  const remoteOptionPath = remoteDirectoryArr.slice(0, remoteDirectoryArr.length - 1).join('/');
  const remoteRealyPath = remoteOptionPath + '/' + zipFileName + '.zip'

  config.zipFileName = zipFileName;
  config.remoteDirectoryName = remoteDirectoryName
  config.remoteRealyPath = remoteRealyPath;
  config.remoteOptionPath = remoteOptionPath

  return config;
}

module.exports = normalizeConfig