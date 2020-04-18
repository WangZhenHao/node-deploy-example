const path = require('path');

// function 

const uitls = {
  seprate: path.sep,
  directoryName(filePath, seprate) {
    seprate = seprate ? seprate : this.seprate
    const directoryArr = filePath.split(seprate);
    const directoryName = directoryArr[directoryArr.length - 1]

    return directoryName
  },
  pathResolve(dirname, dir) {
    return path.resolve(dirname, dir)
  }
}

module.exports = uitls;