//API=https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
//key=546db18e3c6f4616a3c04b58a50dd8be

let url = "https://api.opencagedata.com/geocode/v1/json"
let key = "546db18e3c6f4616a3c04b58a50dd8be"
let btn = document.querySelector(".btn")
let mainContainer=document.querySelector(".main_container")
let bodyInfo=document.querySelectorAll(".info_body>h1 ")
let country = document.querySelector(".country")
let state = document.querySelector(".state")
let city = document.querySelector(".city")
let area = document.querySelector(".area")
let res = document.querySelector(".res")



getLocation = () => {
    let loc = navigator.geolocation
    if (loc) {
        console.log("support");
        loc.getCurrentPosition(succesCallback, errorCallback)
    } else {
        console.log("does not support");
    }

}

succesCallback = (positon) => {
    // console.log(positon);
    let lat = positon.coords.latitude;
    let lng = positon.coords.longitude;
    let myUrl = `${url}?q=${lat}+${lng}&key=${key}`

    let obj = new XMLHttpRequest()
    obj.open("GET", myUrl)
    obj.send()

    country.innerHTML = ""
    state.innerHTML = ""
    city.innerHTML = ""
    area.innerHTML = ""
    res.innerHTML = ""

    obj.onload = () => {
        const response = obj.response

        if(response){
            const data = JSON.parse(response)
        // console.log(response);
        // console.log(data);

        mainContainer.style.height="50vh"
        for(let elements of bodyInfo){
            elements.style.visibility="visible"
        }
          country.innerHTML = `${"Country :"} ${data.results[0].components.country}`
        state.innerHTML = `${"State :"} ${data.results[0].components.state}`
        city.innerHTML = `${"City :"} ${data.results[0].components.state_district}`
        area.innerHTML = `${"Area :"} ${data.results[0].components.suburb}`
        res.innerHTML = `${"Result :"} ${data.status.message}`

        }else{
            res.innerHTML = `${"Result :"} "Something went wrong"`
        }

  

    }

}

errorCallback = (error) => {
    console.log(error);
    let errorCode = error.code
    switch (errorCode) {
        case 0:
            res.innerHTML = `${res.innerHTML} ${"unknown_error"}`
            break;
        case 1:
            res.innerHTML = `${res.innerHTML} ${"permission_denied"}`
            break;
        case 2:
            res.innerHTML = `${res.innerHTML} ${"position_unavailable"}`
            break;
        case 3:
            res.innerHTML = `${res.innerHTML} ${"timeout"}`
            break;
        default:
            res.innerHTML = `${res.innerHTML} ${"something went wrong"}`
    }

}



btn.addEventListener("click", (eve) => {
    // debugger
    getLocation()
})


