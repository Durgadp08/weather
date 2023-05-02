const express = require("express");
const bodyparser = require("body-parser");
const keys = require('dotenv').config();
const app = express()
const http = require("https")
app.set("view engine","ejs")
app.use(express.static("files"))
app.use(bodyparser.urlencoded({extended:true}))

const appid = process.env.API_KEY
app.get("/",function(req,res){
    res.render("index",{
        temp:"-",
        wind:"-",
        humidity:"-",
        visibility:"-",
        city:"-"
    })
})
app.post("/",function(req,res){
    const city=req.body.City;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
    http.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            if(weatherData.cod===200){
                const temp = weatherData.main.temp
                const weatherDes = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const wind = weatherData.wind.speed
                const humidity = weatherData.main.humidity
                const visibility = weatherData.visibility
                const name = weatherData.name
                const imgurl =  "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.render("index",{
                    temp:temp,
                    wind:wind,
                    humidity:humidity,
                    visibility:visibility,
                    city:name
                })
            }
            else{
                res.render("index",{
                    temp:"-",
                    wind:"-",
                    visibility:"-",
                    humidity:"-",
                    city:"City Not Found"
                })
            }
        })
    })
})
app.listen(3000,function(){
    console.log("Server Started")
})

