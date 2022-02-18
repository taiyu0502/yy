let des = new Date(2022, 0, 14, 21, 0, 0)

function updateTime() {
    let cur = new Date();
    let td = des - cur

    if (td < 0) {
        return;
    }

    let _days = Math.floor(td / 1000 / 24 / 60 / 60)
    let _hr = Math.floor((td / 1000 / 60 / 60) % 24)
    let _min = Math.floor((td / 1000 / 60) % 60)
    let _sec = Math.floor((td / 1000) % 60)

    document.getElementById("days").innerHTML = _days;
    document.getElementById("hr").innerHTML = _hr;
    document.getElementById("mins").innerHTML = _min;
    document.getElementById("sec").innerHTML = _sec;
}

setInterval(updateTime, 1000);