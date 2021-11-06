const wxml = (data) => {
    return `
    <view class="container">
        <image class="bgImg" src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/poster/bg${data.poster}.png" />
        <view class="absolute">
            <text class="title">${data.title}</text>
            <image class="logo" src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/poster/new-logo.png" />
            <text class="date">时间：${data.date}</text>
            <text class="address">${data.address?('地点：'+data.address):('直播地址：'+data.liveAddress)}</text>
            <image class="qrcode" src="${data.qrcode}" />
            <text class="qrcodeText">长按识别二维码，进入活动！</text>
        </view>
    </view>
    `
}

const style = () => {
    return {
        container: {
            width: 325,
            height: 656,
            flexDirection: 'column',
            alignItems: 'center'
        },
        absolute: {
            width: 325,
            height: 656,
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            marginTop: 88,
            color: '#fff',
            width: 325,
            height: 41,
            fontSize: 17,
            textAlign: 'center'
        },
        logo: {
            marginTop: 71,
            width: 85,
            height: 70,
            marginBottom: 15
        },
        date: {
            marginTop: 15,
            color: '#002fa7',
            width: 325,
            fontSize: 12,
            height: 19,
            textAlign: 'center'
        },
        address: {
            marginTop: 10,
            color: '#002fa7',
            width: 325,
            fontSize: 12,
            height: 19,
            textAlign: 'center'
        },
        qrcode: {
            backgroundColor: '#ffffff',
            marginTop: 40,
            height: 185,
            width: 185,
            borderRadius: 100
        },
        qrcodeText: {
            color: '#ffffff',
            fontSize: 12,
            marginTop: 15,
            height: 17,
            width: 325,
            textAlign: 'center'
        },
        bgImg: {
            position: 'absolute',
            width: 325,
            height: 656,
            top: 0,
            left: 0
        }
    }
}
const summitwxml = (data) => {
    return `
    <view class="container">
    <image class="bgImg" src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/poster/bg5.png" />
    <view class="absolute">
         <view class="boxF">
            <view class="boxS">
               <image class="head" src="${data.avatarUrl}" />
             </view>
        </view>
         <text class="qrcodeText"> ${data.nickName} </text>
         <image class="qrcode" src="${data.qrcode}" />

    </view>
</view>
    `
}
const summitstyle = () => {
    return {
        qrcode: {
            position: 'absolute',
            height: 75,
            width: 75,
            left:15,
            bottom:15,
            backgroundColor: '#ffffff',
        },
        head :{
            position: 'absolute',
            height: 70,
            width: 70,
            top: 323,
            left : -35,
            borderRadius: 35,
            backgroundColor: '#ffffff',
        },
        qrcodeText: {
            color: '#ffffff',
            fontSize: 18,
            marginTop: 440,
            height: 34,
            width: 325,
            textAlign: 'center'
        },
        nickName : {
            marginTop: 25,
            color: '#ffffff',
            width: 325,
            height: 41,
            fontSize: 36,
            textAlign: 'center'
        },
        container: {
            width: 325,
            height: 656,
            flexDirection: 'column',
            alignItems: 'center'
        },
        absolute: {
            width: 325,
            height: 656,
            flexDirection: 'column',
            alignItems: 'center'
        },
        bgImg: {
            position: 'absolute',
            width: 325,
            height: 656,
            top: 0,
            left: 0,
            zIndex:-1
        },
    }
}
module.exports = {
    wxml,
    style,
    summitstyle,
    summitwxml
}