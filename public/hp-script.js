// class User {
//     constructor(name, feedback, rating){
//       this.name = name;
//       this.feedback = feedback;
//       this.rating = rating;
//     }
//   }
  
//   const user1 = new User("Michael Angelo", "I would like to eat here forever!", 4);
//   const user2 = new User("Sarah Johnson", "Fantastic food and service!", 5);
//   const user3 = new User("John Smith", "Great atmosphere and delicious dishes.", 4);
//   const user4 = new User("Emily Davis", "The best restaurant in town!", 5);
//   const user5 = new User("Alex Martinez", "Amazing experience from start to finish.", 5);
//   const user6 = new User("Jessica Miller", "Impressive menu and attentive staff.", 4);
//   const user7 = new User("David Lee", "A hidden gem! Must try their specials.", 4);
//   const user8 = new User("Olivia Taylor", "Lovely ambiance and top-notch cuisine.", 5);
//   const user9 = new User("Daniel White", "Exceptional service and mouth-watering dishes.", 5);
//   const user10 = new User("Sophia Brown", "I'll definitely be coming back!", 4);
//   const user11 = new User("William Turner", "Delicious food and friendly staff.", 4);
//   const user12 = new User("Ava Garcia", "Cozy setting with a diverse menu.", 4);
//   const user13 = new User("James Wilson", "Perfect for special occasions. Highly recommend.", 5);
//   const user14 = new User("Emma Harris", "Great value for the quality of food.", 5);
//   const user15 = new User("Liam Davis", "Outstanding experience every time!", 5);
  
//   let feedback1 = [user1,user2,user3];
//   let feedback2 = [user4,user5,user6];
//   let feedback3 = [user7,user8,user9];
//   let feedback4 = [user10,user11,user12];
//   let feedback5 = [user13,user14,user15];
  
//   let users = [feedback1,feedback2,feedback3,feedback4,feedback5];
  
  let currentIndex = 0;
  
  let images = ["/images/chimmy.jpeg", "/images/24-profile.jpg", "/images/dimsum-treats.jpeg", "/images/tea-cup.jpg" , "/images/j&j.jpg"]; 
  let resto_titles = ["Chimmy", "24 Chicken" , "Dimsum Treats", "T-Cup-Zone", "Jus and Jerry's"];
  
  // function next(){
  //   currentIndex = (currentIndex + 1) % images.length;
  //   moveDots(currentIndex+1);
  // }
  
  // function prev(){
  //   currentIndex = (currentIndex - 1 + images.length) % images.length;
  //   moveDots(currentIndex+1);
  // }
  
  function moveDots(index){
    let dots = document.getElementsByClassName("dot");
  
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    dots[index-1].className += " active";
  }
  
//   function showImage(index) {
//     var displayImgResto = document.getElementById("display-img-resto");
//     var displayTitleResto = document.getElementById("resto-title");
//     displayTitleResto.innerText = resto_titles[currentIndex];
//     displayImgResto.src = images[currentIndex];
//   }
  
//   function setDefault(index) {
//     // Access the set of users based on the provided index
//     let setOfUsers = users[index];
  
//     for (let i = 0; i < setOfUsers.length; i++) {
//       switch (i){
//         case 0: {
//             document.getElementById("first-review").querySelector("h3").textContent = setOfUsers[i].name;
//             document.getElementById("first-review").querySelector("p").textContent = setOfUsers[i].feedback;
//             let stars = document.getElementById("first-review").querySelectorAll(".fa-star");
//             setStars(stars, setOfUsers[i].rating);
//             break;
//         }
//         case 1 : {
//             document.getElementById("second-review").querySelector("h3").textContent = setOfUsers[i].name;
//             document.getElementById("second-review").querySelector("p").textContent = setOfUsers[i].feedback;
//             let stars = document.getElementById("second-review").querySelectorAll(".fa-star");
//             setStars(stars, setOfUsers[i].rating);
//             break;
//         }
//         case 2 : {
//             document.getElementById("third-review").querySelector("h3").textContent = setOfUsers[i].name;
//             document.getElementById("third-review").querySelector("p").textContent = setOfUsers[i].feedback;
//             let stars = document.getElementById("third-review").querySelectorAll(".fa-star");
//             setStars(stars, setOfUsers[i].rating);
//             break;
//         }
//       }
//     }
//   }
  
//   function switchFeedback(index){
//     let setOfUsers = users[index]; //index 0 {[1,2,3]}
//     //get user data 
  
//     for (let i = 0; i < setOfUsers.length; i++){ 
//       switch (i){
//         case 0: {
//           document.getElementById("first-review").querySelector("h3").textContent = setOfUsers[i].name;
//           document.getElementById("first-review").querySelector("p").textContent = setOfUsers[i].feedback;
//           let stars = document.getElementById("first-review").querySelectorAll(".fa-star");
//           setStars(stars, setOfUsers[i].rating);
//           break;
//         }
//         case 1 : {
//           document.getElementById("second-review").querySelector("h3").textContent = setOfUsers[i].name;
//           document.getElementById("second-review").querySelector("p").textContent = setOfUsers[i].feedback;
//           let stars = document.getElementById("second-review").querySelectorAll(".fa-star");
//           setStars(stars, setOfUsers[i].rating);
//           break;
//         }
//         case 2 : {
//           document.getElementById("third-review").querySelector("h3").textContent = setOfUsers[i].name;
//           document.getElementById("third-review").querySelector("p").textContent = setOfUsers[i].feedback;
//           let stars = document.getElementById("third-review").querySelectorAll(".fa-star");
//           setStars(stars, setOfUsers[i].rating);
//           break;
//         }
//       }
//     }
//   }
  
//   // Function to set stars based on rating
//   function setStars(stars, rating) {
//     for (let i = 0; i < rating; i++) {
//         stars[i].classList.add("checked");
//     }
//   }
  
//   function removeStars() {
//     let stars1 = document.getElementById("first-review").querySelectorAll(".fa-star");
//     let stars2 = document.getElementById("second-review").querySelectorAll(".fa-star");
//     let stars3 = document.getElementById("third-review").querySelectorAll(".fa-star");
  
//     for (let i = 0; i < stars1.length; i++) {
//         stars1[i].classList.remove("checked");
//         stars2[i].classList.remove("checked");
//         stars3[i].classList.remove("checked");
//     }
//   }

  function showLogIn() {
    document.querySelector(".popup-login").style.display = "flex";
    document.querySelector(".options").style.display = "none";
  }
  
  function closeLogIn() {
    document.querySelector(".popup-login").style.display = "none";
  
    let username = document.getElementById("username");
    username.value = '';
  
    let password = document.getElementById("password");
    password.value = '';
  
    document.querySelector(".options").style.display = "block";
  }
  
  function showSignup() {
    document.querySelector(".popup-signup").style.display = "flex";
    document.querySelector(".options").style.display = "none";
  }
  
  function closeSignup() {
    document.querySelector(".popup-signup").style.display = "none";
  
    let username = document.getElementById("username-signup");
    username.value = '';
  
    let password = document.getElementById("password-signup");
    password.value = '';
  
    let v_password = document.getElementById("verify-password-signup");
    v_password.value = '';
  
    document.querySelector(".options").style.display = "block";
  }
  
  function verifyPassword(){
    let p1 = document.forms["signup"]["password-signup"].value;
    let p2 = document.forms["signup"]["verify-password-signup"].value;
  
    if (p1 == p2){
      closeSignup();
      return true;
    }
    else {
      alert("Password does not match");
      return false;
    }
  }
  
  function successfulLogin(){
    closeLogIn();
    return true;
  }
  
//   window.onload = function () {
//     setDefault(0); // Pass the index of the set you want to use as default
//   };

  function next(i){
    const size = 5;
    i = (i + 1) % size;
    return i;
  }

  function previous(i){
    const size = 5;
    i = (i - 1 + size) % size;
    return i;
  }

  $(document).ready(function(){
    let order = 1;  // Initialize i outside the click handler

    $('#next-button').click(function(){
        $.post(
            '/update-image',
            { input: next(order), sts: "next" },
            function(data, status){
                if(status === 'success'){
                  $('#display-img-resto').attr('src', data.url);
                  order = data.index;  // Update the order variable
                  $('#resto-title').text(data.title); // Update restoName
                  moveDots(order);
                }
            }
        );
    });

    $('#previous-button').click(function(){
        $.post(
            '/update-image',
            { input: previous(order), sts: "previous"},
            function(data, status){
                if(status === 'success'){
                  $('#display-img-resto').attr('src', data.url);
                  $('#resto-title').text(data.title); // Update restoName
                  order = data.index;  // Update the order variable
                  moveDots(order);
                }
            }
        );
    });
  });




  // function next(){
  //   $.post(
  //     /* Link sent to the server */
  //     'update',
  //     /* Input sent to the server */
  //     { input: ++order },
  //     /* Call-back function that processes the server response */
  //     function(data, status){
  //         if(status === 'success'){
  //             let textContent = "{{restoData[" + data.index + "].restoPic}}";
  //             $('#display-img-resto').attr('src', textContent);  
  //         }//if
  //     }//function
  //   );//post
  // }

  // function previous(){
  //   $.post(
  //     /* Link sent to the server */
  //     'update',
  //     /* Input sent to the server */
  //     { input: --order },
  //     /* Call-back function that processes the server response */
  //     function(data, status){
  //         if(status === 'success'){
  //             let textContent = "{{restoData[" + data.index + "].restoPic}}";
  //             $('#display-img-resto').attr('src', textContent);  
  //         }//if
  //     }//function
  //   );//post
  // }