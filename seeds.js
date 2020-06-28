var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment  = require("./models/comment");

var data = [
    {
        name:"cloud's Rest",
        image:"https://www.dw.com/image/48396304_303.jpg", 
        description:"A mountain is a large landform that rises above the surrounding land in a limited area, usually in the form of a peak.[1] A mountain is generally considered to be steeper than a hill. Mountains are formed through tectonic forces or volcanism. These forces can locally raise the surface of the earth. Mountains erode slowly through the action of rivers, weather conditions, and glaciers. A few mountains are isolated summits, but most occur in huge mountain ranges."
    }
]
function seedDB(){
    //REMOVE ALL CAMPGROUND
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campground");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err)
                }else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is great but I Wish was inetrested",
                            author:"Ubaid"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few campgrounds
  
}

module.exports = seedDB;