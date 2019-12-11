//数字增加控件
function numberPlus(num,max) {
  return num > max ? num = max : num = num + 1
}
module.exports = {
  plus: numberPlus
}