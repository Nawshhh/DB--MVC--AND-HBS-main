
module.exports = function (app) {

  const { MongoClient } = require("mongodb"); // Import MongoClient
  const uri = "mongodb://127.0.0.1:27017/eggyDB";

  const express = require('express');
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true }));

  let loginInfo = null; //this is searchQuery from the app.get... chuchu

  //call this function to render the home page again (used for homepage)
  // param 
  // @data - contains user log-in credentials
  //       - pass null to @data if you don't need to pass any log-in information

  let feedback = [];
  
  let chimmy = [];
  let dimsum_treats = [];
  let chicken24 = [];
  let tea_cup_zone = [];
  let JJs = [];

  function loadServer(req, resp, data) {
    MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected to MongoDB AGAIN");
      let dbo       = client.db("eggyDB"); // Get the database object
      let collName  = dbo.collection("restaurants"); // Get the collection
      let cursor    = collName.find({}); // Find all documents in the collection

      let collName2 = dbo.collection("comments"); // Get the collection
      let cursor2 = collName2.find(
        {
          username: { $exists: true },
          content: { $exists: true },
          'overall-rating': { $exists: true }
        },
        { 
          projection: { 
            _id: 0, 
            title: 0,
            'food-rating': 0,
            'service-rating': 0,
            'ambiance-rating': 0,
            'date': 0,
            numLike: 0,
            numDislike: 0,
            ownerReplyStatus: 0
          } 
        }
      ); // Get the collection

      Promise.all([cursor.toArray(),cursor2.toArray()])
        .then(function ([restaurants,comments]) {
          let restoData = restaurants.slice(0, 4); //restaurants data from db

          for (let i = 0; i < comments.length; i++){
            switch(comments[i].restoName){
              case "Chimmy" : chimmy.push(comments[i]); break;
              case "Dimsum Treats" : dimsum_treats.push(comments[i]); break;
              case "24 Chicken" : chicken24.push(comments[i]); break;
              case "Tea Cup Zone" : tea_cup_zone.push(comments[i]); break;
              case "Jus & Jerry's" : JJs.push(comments[i]); break;
            }
          }

          let commentData = [];

          switch(restoData[0].restoName){
            case "Chimmy" : commentData = chimmy; break;
            case "Dimsum Treats" : commentData = dimsum_treats; break;
            case "24 Chicken" : commentData = chicken24; break;
            case "Tea Cup Zone" : commentData = tea_cup_zone; break;
            case "Jus & Jerry's" : commentData = JJs; break;
          }

          console.log(commentData[0]);

          for (let i = 0; i < commentData.length; i++){
            let ratingCountArray = [];
            for (let j = 0; j < commentData[i]['overall-rating']; j++){
                ratingCountArray.push(j);
            }
            commentData[i]['ratingCount'] = ratingCountArray;
            commentData[i].content = truncateString(commentData[i].content);
            console.log(commentData[i]['ratingCount']);
          }

          resp.render("main", {
            layout: "index",
            title: "My Home page",
            restoData,
            loginData: data,
            commentData
          });

        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
          resp.status(500).send("Error fetching data");
        })
        .finally(() => {
          client.close(); // Close the MongoDB client after fetching data
        });

    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      resp.status(500).send("Error connecting to MongoDB");
    });
  }

  // load homepage
  app.get("/", function (req, resp) {
      loadServer(req,resp,null);
  });

  app.post('/update-image', function(req, resp) {
    const size = 5;
    let i = Number(req.body.input);

    MongoClient.connect(uri).then((client) => {
        const dbo = client.db("eggyDB"); // Get the database object
        const collName = dbo.collection("restaurants"); // Get the collection
        const cursor = collName.find({ restoPic: { $exists: true } , restoName: {$exists: true}});
      
        let collName2 = dbo.collection("comments"); // Get the collection
        let cursor2 = collName2.find(
          {
            username: { $exists: true },
            content: { $exists: true },
            'overall-rating': { $exists: true }
          },
          { 
            projection: { 
              _id: 0, 
              title: 0,
              'food-rating': 0,
              'service-rating': 0,
              'ambiance-rating': 0,
              'date': 0,
              numLike: 0,
              numDislike: 0,
              ownerReplyStatus: 0
            } 
          }
        ); // Get the collection

        console.log("connected to database");

        Promise.all([cursor.toArray(), cursor2.toArray()])
        .then(([images, comments]) => {
          // 'images' and 'comments' are arrays of documents from cursor and cursor2 respectively
          // console.log("Images:", images);

          for (let j = 0; j < comments.length; j++){
            switch(comments[j].restoName){
              case "Chimmy" : chimmy.push(comments[j]); break;
              case "Dimsum Treats" : dimsum_treats.push(comments[j]); break;
              case "24 Chicken" : chicken24.push(comments[j]); break;
              case "Tea Cup Zone" : tea_cup_zone.push(comments[j]); break;
              case "Jus & Jerry's" : JJs.push(comments[j]); break;
            }
          }

          switch (images[i].restoName){
            case "Chimmy" : commentData = chimmy; break;
            case "Dimsum Treats" : commentData = dimsum_treats; break;
            case "24 Chicken" : commentData = chicken24; break;
            case "Tea Cup Zone" : commentData = tea_cup_zone; break;
            case "Jus & Jerry's" : commentData = JJs; break;
              default: commentData = null;
          }

          console.log("New Index: " + i);
          // console.log("Picture: " + images[i].restoPic);
          console.log("Title: " + images[i].restoName);
    
          console.log("Username: " + commentData[i].username);
          console.log("Length: " + commentData.length);

          console.log(commentData);

          resp.send({ index: i , url: images[i].restoPic, title: images[i].restoName, commentData});
        })
        .catch((error) => {
          console.error("Error converting cursor to array:", error);
        });
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    }); 
  });

  // sign up user
  app.post('/create-user', function(req, resp) {
      let client = new MongoClient(uri);

      let dbo = client.db("eggyDB"); // Get the database object
      let collName = dbo.collection("users"); // Get the collection

      console.log(req.body.user1);
      console.log(req.body.user2);
      console.log(req.body.pass);

      const info = {
          email: req.body.user1,
          username: req.body.user2,
          password: req.body.pass,
          avatar_url: "./images/profile-pic.png"
      };

      collName.insertOne(info)
        .then(loadServer(req,resp,null))
        .catch(function(err) {
            console.error('Error creating user:', err);
            resp.status(500).send('Internal Server Error');
        });
  });

  // login user
  app.post('/read-user', function(req, resp) {
    const client = new MongoClient(uri);

    const dbo = client.db("eggyDB");
    const collName = dbo.collection("users");

    //contains log-in information
    const searchQuery = {
        username: req.body.userlogin,
        password: req.body.passlogin
    };

    collName.findOne(searchQuery)
        .then(function(val) {
            console.log('Finding user');
            console.log('Inside: ' + JSON.stringify(val));

            if (val != null) {
              searchQuery.avatar_url = val.avatar_url;
              loginInfo = searchQuery;
              loadServer(req,resp,loginInfo);
            } else {
              loginInfo = null;
              loadServer(req,resp,null);
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            resp.status(500).send('Error occurred!');
        })
        .finally(() => {
            // Close the MongoDB connection in the finally block to ensure it is closed even if there is an error.
            client.close();
        });
  });

  // logout user
  app.post('/logout-user', function(req,resp) {
    loginInfo = null;
    loadServer(req,resp,null);
  });

  app.get("/view-establishment.hbs", function (req, resp) {
    // Connect to MongoDB
    MongoClient.connect(uri)
      .then((client) => {
        console.log("Connected to MongoDB");
        const dbo = client.db("eggyDB"); // Get the database object
        const collName = dbo.collection("restaurants"); // Get the collection

        const { stars } = req.query;

        let filter = {};
        if (stars) {
          const selectedRatings = Array.isArray(stars) ? stars.map(Number) : [Number(stars)];
          // Construct an array of filters for each selected rating
          const ratingFilters = selectedRatings.map(selectedRating => {
            // Calculate the rating range for each selected rating
            const minRating = selectedRating;
            const maxRating = selectedRating + 1;
            return { main_rating: { $gte: minRating, $lt: maxRating } };
          });
          // Combine the filters using the $or operator
          filter = { $or: ratingFilters };
        }

        const cursor = collName.find(filter);

        Promise.all([cursor.toArray()])
          .then(function ([restaurants]) {
            console.log("Data fetched successfully");
            // Split the displayRestos array into two arrays
            const restaurant_row1 = restaurants.slice(0, 3);
            const restaurant_row2 = restaurants.slice(3, 6);
            const restaurant_row3 = restaurants.slice(6);
            resp.render("view-establishment", {
              layout: "index",
              title: "View Establishments",
              restaurant_row1,
              restaurant_row2,
              restaurant_row3,
              loginData: loginInfo
            });
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
            resp.status(500).send("Error fetching data");
          })
          .finally(() => {
            client.close(); // Close the MongoDB client after fetching data
          });
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        resp.status(500).send("Error connecting to MongoDB");
      });
  });
};


function truncateString(inputString) {
  const maxLength = 152;
  if (inputString.length <= maxLength) {
      return inputString; // Return the original string if it's within the limit
  } else {
      return inputString.slice(0, maxLength) + "..."; // Truncate the string to the maximum length
  }
}

// /*
//   - make a function that splits the array of all comments into 5 restaurants namely, 
//   - return value: a hashmap of reviews
//   - parameters:
//     @commentArray   - array to be sliced
//     @restaurant     - restaurant to filer the reviews
// */
// function splitReview(commentArray,restaurant){

//   let tempArray = [];

//   for (let i = 0; i < commentArray.length; i++){
//     if (commentArray[i] === restaurant){
//       tempArray.push(commentArray[i]);
//     }
//   }

//   return tempArray;
// }