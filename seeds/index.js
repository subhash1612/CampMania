const mongoose = require('mongoose');
const Campground = require("../models/campground")
const cities  = require("./cities");
const {places,descriptors} = require("./seedHelpers")

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)]

const seedDB = async() => {     //delete everything from db
    await Campground.deleteMany({});
    for(let i=0;i<200;i++) {
        const random  = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random() * 20) + 10;
       const camp =  new Campground({
            author: '62138a1384bda73ee72891cc',
            location : `${cities[random].city},${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude,
                ]
            },
            images: [{ "url" : 'https://res.cloudinary.com/dmx4fwdnn/image/upload/v1646401864/YelpCamp/ayl67qzgxzoxizdgyazi.jpg', "filename" : 'YelpCamp/ayl67qzgxzoxizdgyazi' }] ,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price // shorthand for price:price
        })
        await camp.save();
    }

}
 
//close connection after seeding
seedDB().then(()=>{
    mongoose.connection.close();
});
