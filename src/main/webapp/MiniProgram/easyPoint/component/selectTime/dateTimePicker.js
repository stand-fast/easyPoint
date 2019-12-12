//时间控件-获取开始时间
function withData(param) {
    return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start, end) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(withData(i));
    }
    return array;
}
function getMonthDay(year, month) {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
    switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            array = getLoopArray(1, 31)
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            array = getLoopArray(1, 30)
            break;
        case '02':
            array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
            break;
        default:
            array = '月份格式不正确，请重新输入！'
    }
    return array;
}
function getNewDateArry() {
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour = withData(newDate.getHours()),
        minu = withData(newDate.getMinutes()),
        seco = withData(newDate.getSeconds());
    return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear, endYear, date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
    var start = startYear || 2019;
    var end = endYear || 2100;
    // 默认开始显示数据
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);
    dateTimeArray.forEach((current, index) => {
        dateTime.push(current.indexOf(defaultDate[index]));
    });
    return {
        dateTimeArray,
        dateTime
    }
}
//初始化时间控件并获取当下时间
function timeSelection() {
  //获取完整的年月日 时分秒，以及默认显示的数组
  var obj = this.dateTimePicker(2019, 2050);
  //精确到分的处理，将数组的秒去掉
  var lastArray = obj.dateTimeArray.pop();
  var lastTime = obj.dateTime.pop();
  //日期转换
  var data = obj.dateTimeArray;
  var getStartTime = obj.dateTime;
  for (var i = 0; i < data.length; i++) {
    var name;
    switch (i) {
      case 0:
        name = "年";
        break;
      case 1:
        name = "月";
        break;
      case 2:
        name = "日";
        break;
      case 3:
        name = "时";
        break;
      case 4:
        name = "分";
        break;
    }
    for (var j = 0; j < data[i].length; j++) {
      data[i][j] = data[i][j] + name;
    }
  }
  return [data, getStartTime]
}
module.exports = {
  timeSelection,
  dateTimePicker,
  getMonthDay
}