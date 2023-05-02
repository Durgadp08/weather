const express = require("express")
const bodyparser = require("body-Parser")
const app = express()
const http = require("https")
app.set("view engine","ejs")
app.use(express.static("files"))
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.render("index",{
        temp:"-",
        wind:"-",
        visibility:"-",
        city:"-"
    })
})
app.post("/",function(req,res){
    const city=req.body.City
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ef30456bf732b291363039c65c3d307c&units=metric"
    http.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            if(weatherData.cod===200){
                const temp = weatherData.main.temp
                const weatherDes = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const wind = weatherData.wind.speed
                const visibility = weatherData.visibility
                const imgurl =  "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.render("index",{
                    temp:temp,
                    wind:wind,
                    visibility:visibility,
                    city:city
                })
            }
            else{
                res.render("index",{
                    temp:"-",
                    wind:"-",
                    visibility:"-",
                    city:"City Not Found"
                })
            }
        })
    })
})
app.listen(3000,function(){
    console.log("Server Started")
})

