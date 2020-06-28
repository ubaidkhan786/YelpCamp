var express     = require("express");
var router      = express.Router();
var Campground  = require("./models/campground");

//INDEX - show all campgrounds
router.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});


//CREATE: add new campground to DB
router.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc}
   // campgrounds.push(newCampground);
     
   //create a new campground and save to DB
   Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       }else{
        res.redirect("/campgrounds");       
       }
   });
});

//New- Show form to create new campgroun
router.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

//Show - shows more info about one campground
router.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
    //req.params.id 
    

});

module.exports = router;