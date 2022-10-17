const fs = require('fs')
const axios = require('axios');
const { text } = require('stream/consumers');

const file = fs.readFileSync('2022-data.json');
const data =  JSON.parse(file)

const requestUrl = "https://oapi.dingtalk.com/robot/send?access_token=d7a0ed3560050249ea28dc7fda470acf80e4a098277d1fad3a70f290a074e71d"

const date = new Date()
const year = date.getFullYear()
const month = +date.getMonth() + 1
const day = date.getDate()
const week = date.getDay()

const currentDate = year + "/" + month + "/" + day
const currentDateString =  year + "年" + month + "月" + day + "日"

const dayArr = ['星期日' ,'星期一' ,'星期二' ,'星期三' ,'星期四' ,'星期五' ,'星期六']
const nowWeek = dayArr[week]

let info = {
    name: '未知',
    phone: '未知'
}

data.forEach(item => {
    if(item.date === currentDate) {
        info = item
    }
})

let requestData = "今日值班人员: " + info.name + ", 联系电话: " + info.phone + ", 今天是" + currentDateString + ", " + nowWeek

console.log(requestData)

axios.post(requestUrl, {
    msgtype: "text",
    text: {
        "content": requestData
    },
    at: {
        isAtAll: true
    },
})
.then(res => {    
    console.log('发送成功');
    console.log(res.data);
})
.catch(error => {        
    console.log(error);
});


