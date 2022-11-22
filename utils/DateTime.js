const currentDateAndTime = async () => {
  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36)
}

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const formattedDate = async () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  return date 
}

const getDayName = async () => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  return dayName
}

const compareTime = async (time_Start, time_End, time_In) => {
  let timeStart = new Date(time_Start)
  let timeEnd =  new Date(time_End)
  let timeIn = new Date(time_In)
  let newStart = new Date(timeStart.getTime() + (20*60*1000))

  // console.log('timeStart',timeStart.toLocaleTimeString())
  // console.log('timeEnd',timeEnd.toLocaleTimeString())
  // console.log('newSTART',newStart.toLocaleTimeString())

  if(new Date(timeIn).getMinutes() > new Date(newStart).getMinutes() ){
    return 'late'
  }else{
    return 'present'
  }

}
module.exports = { currentDateAndTime, uid,formatAMPM,formattedDate, getDayName, compareTime }
