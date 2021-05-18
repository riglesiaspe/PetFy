var mongoose = require("mongoose"),
Pet = require("./models/pet"),
Comment = require("./models/comment")

var data = [
        {
            name: "Dragon ball",
            image: "http://static.srcdn.com/slir/w700-h350-q90-c700:350/wp-content/uploads/Dragon-Ball-Super-Anime.jpg",
            description: "yayayayyaya"

        },
        {
            name: "8888888",
            image: "http://static.srcdn.com/slir/w525-h262-q90-c525:262/wp-content/uploads/videos/1465421934616-brightcove0124-4797351740001-201606-3133-4797351740001_4931935980001_4931915391001-vs.jpg",
            description: "uuuuuuuuu"

        },
        {
            name: "Kylo-Ren",
            image: "http://static.srcdn.com/slir/w525-h262-q90-c525:262/wp-content/uploads/LEGO-Star-Wars-Force-Awakens-trailer-Kylo-Ren.jpg",
            description: "nonononononno"

        }
    ]

function seedDB(){
    // Remove all pets
    Pet.remove({}, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log("remove pet!");
             data.forEach(function(seed){
        Pet.create(seed, function(err, pet){
            if (err) {
                console.log(err)
            } else {
                console.log("add a pet")
                // creat a comment
                Comment.create(
                    {
                         text: "wowowow",
                         author: "homer"

                    }, function(err, comment){
                      if (err) {
                          console.log(err)
                      } else {
                            pet.comments.push(comment);
                            pet.save();
                            console.log("creat new comment");
                      }
                    });
            }
        });
    });
        }
    });

    }

module.exports = seedDB;