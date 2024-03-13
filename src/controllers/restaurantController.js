
module.exports = function (app, resto) {

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
  function loadServer(req, resp, data) {
    MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected to MongoDB AGAIN");
      let dbo = client.db("eggyDB"); // Get the database object
      let collName = dbo.collection("restaurants"); // Get the collection
      let cursor = collName.find({}); // Find all documents in the collection

      Promise.all([cursor.toArray()])
        .then(function ([restaurants]) {
          console.log("Data fetched successfully");
          const restoData = restaurants.slice(0, 4);
          resp.render("main", {
            layout: "homepage",
            title: "My Home page",
            restoData,
            loginData: data
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
    // MongoClient.connect(uri)
    //   .then((client) => {
    //     console.log("Connected to MongoDB");
    //     const dbo = client.db("eggyDB"); // Get the database object
    //     const collName = dbo.collection("restaurants"); // Get the collection
    //     const cursor = collName.find({}); // Find all documents in the collection

    //     Promise.all([cursor.toArray()])
    //       .then(function ([restaurants]) {
    //         console.log("Data fetched successfully");
    //         const restoData = restaurants.slice(0, 4);
    //         resp.render("main", {
    //           layout: "homepage",
    //           title: "My Home page",
    //           restoData
    //         });
    //       })
    //       .catch(function (error) {
    //         console.error("Error fetching data:", error);
    //         resp.status(500).send("Error fetching data");
    //       })
    //       .finally(() => {
    //         client.close(); // Close the MongoDB client after fetching data
    //       });
    //   })
    //   .catch((err) => {
    //     console.error("Error connecting to MongoDB:", err);
    //     resp.status(500).send("Error connecting to MongoDB");
    //   });
      loadServer(req,resp,null);
  });

  app.post('/update-image', function(req, resp) {
    const size = 5;
    let i = Number(req.body.input);

    MongoClient.connect(uri).then((client) => {
        const dbo = client.db("eggyDB"); // Get the database object
        const collName = dbo.collection("restaurants"); // Get the collection
        const cursor = collName.find({ restoPic: { $exists: true } , restoName: {$exists: true}});
      
        console.log("connected to database");

        cursor.toArray().then((documents) => {
            let images = documents; // Store the array of documents in the variable 'images'
            console.log(images); // or do something else with the 'images' array

            console.log("New Index: " + i);
            console.log("Picture: " + images[i].restoPic);
            console.log("Title: " + images[i].restoTitle);

            resp.send({ index: i , url: images[i].restoPic, title: images[i].restoName});
        }).catch((error) => {
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
        password: req.body.passlogin,
    };

    collName.findOne(searchQuery)
        .then(function(val) {
            console.log('Finding user');
            console.log('Inside: ' + JSON.stringify(val));

            if (val != null) {
              loginInfo = searchQuery;
              loadServer(req,resp,searchQuery);
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
  //   MongoClient.connect(uri)
  //     .then((client) => {
  //       console.log("Connected to MongoDB");
  //       const dbo = client.db("eggyDB");
  //       const collName = dbo.collection("restaurants");
  //       const { stars } = req.query;

  //       let filter = {};
  //       if (stars) {
  //         const selectedRatings = Array.isArray(stars) ? stars.map(Number) : [Number(stars)];
  //         // Construct an array of filters for each selected rating
  //         const ratingFilters = selectedRatings.map(selectedRating => {
  //           // Calculate the rating range for each selected rating
  //           const minRating = selectedRating;
  //           const maxRating = selectedRating + 1;
  //           return { main_rating: { $gte: minRating, $lt: maxRating } };
  //         });
  //         // Combine the filters using the $or operator
  //         filter = { $or: ratingFilters };
  //       }

  //       const cursor = collName.find(filter);

  //       Promise.all([cursor.toArray()])
  //         .then(function ([restaurants]) {
  //           console.log("Data fetched successfully");
  //           const restaurant_row1 = restaurants.slice(0, 3);
  //           const restaurant_row2 = restaurants.slice(3, 6);
  //           const restaurant_row3 = restaurants.slice(6);
  //           resp.render("view-establishment", {
  //             layout: "index",
  //             title: "View Establishments",
  //             restaurant_row1,
  //             restaurant_row2,
  //             restaurant_row3
  //           });
  //         })
  //         .catch(function (error) {
  //           console.error("Error fetching data:", error);
  //           resp.status(500).send("Error fetching data");
  //         })
  //         .finally(() => {
  //           client.close();
  //         });
  //     })
  //     .catch((err) => {
  //       console.error("Error connecting to MongoDB:", err);
  //       resp.status(500).send("Error connecting to MongoDB");
  //     });
  // });

};
