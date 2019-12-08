//时间选择控件
function timePicker(arr, dateArr) {
  return dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
}
module.exports = {
  picker: timePicker
}