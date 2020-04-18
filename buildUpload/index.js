const inquirer = require('inquirer');
const toUpload = require('./upload')

const promptList = [
  {
    default: true,
    message: function () {
      return "\033[31mAre you sure to upload files?\033[0m"
    },
    name: "confirm",
    type: 'confirm'
  }
]

function main() {
  inquirer.prompt(promptList).then(async (res) => {
    if (res.confirm) {
      toUpload();
    }
  })
}
main()







