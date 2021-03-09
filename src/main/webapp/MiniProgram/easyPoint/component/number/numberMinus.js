//数字减小控件
function numberMinus(num) {
    return num >= 1 ? num = num - 1 : num = 0
}
module.exports={
  minus: numberMinus
}