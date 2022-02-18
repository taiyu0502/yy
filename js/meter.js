let _start_position = document.getElementById("start_position")
let _distance = document.getElementById("distance")
let _timer = document.getElementById("timer")
let _fare = document.getElementById("fare")
let lat0 = 0
let lon0 = 0
let lat1 = 0
let lon1 = 0
let totalDistance = 0
let timer = 0
let totalFare = 70
let timeCount = 0
let distanceCount = 0

function  clock(){
    let _h = Math.floor(timer/60/60)
    let _m = Math.floor(timer/60%60)
    let _s = Math.floor(timer%60)
    _h = checkTime(_h)
    _m = checkTime(_m)
    _s = checkTime(_s)
    _timer.innerHTML = _h+":"+_m+":"+_s
    timer++
}
function checkTime(i){
    if (i<10){
        i = "0"+i
    }
    return i
}


function startMeter() {
    //-----Set location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition0)
    } else {
        _start_position.innerHTML = "Geolocation is not supported by this browser."
    }
    //-----Start Timer
    clock()
    updateLocation()
    setInterval(clock, 1000)
    //-----Start Update Location
    setInterval(updateLocation, 1000);
}

function setPosition0(position) {
    lat0 = position.coords.latitude
    lon0 = position.coords.longitude
    console.log("set p0 at:\nlat: "+lat0+"\nlon: "+lon0)
}

function updateLocation() {
    navigator.geolocation.getCurrentPosition(setPosition1)
    distance()
}

function setPosition1(position) {
    lat1 = position.coords.latitude
    lon1 = position.coords.longitude
    console.log("current location:\nlat:"+lat1+"\nlon: "+lon1)
}

function distance() {
    let radLat0 = Math.PI * lat0 / 180
    let radLat1 = Math.PI * lat1 / 180
    let theta = lon0 - lon1
    let radTheta = Math.PI * theta / 180
    let dist = Math.sin(radLat0) * Math.sin(radLat1) + Math.cos(radLat0) * Math.cos(radLat1) * Math.cos(radTheta)
    if (dist > 1) {
        dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 111.18957696

    fareCalculator(dist)

    totalDistance += dist
    let _td = totalDistance.toFixed(3)
    _distance.innerHTML = "距離： "+_td+"km, 時速："+dist/0.00083+"km/h"

    lat0 = lat1
    lon0 = lon1
    return dist;
}
function fareCalculator(dist) {
    let speed = dist/0.00083
    if (speed<5){
        timeCount++
    }else {
        distanceCount+=dist
    }
    if (timeCount>80){
        totalFare += 5
        timeCount = 0
    }
    if (distanceCount>1.45){
        totalFare+=5
        distanceCount = 1.25
    }
    _fare.innerHTML = ""+totalFare
}