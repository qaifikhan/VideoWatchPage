$(function () {
  // var cardGrid = document.getElementById("card-grid");
  var cardGrid = $("#card-grid");
  // var progressBar = document.getElementById("progress-bar");
  var progressBar = $("#progress-grid");

  function createVideoCard(data) {
    // <div class="playlist-card active-card">
    //   <a href="./watch-page/player.html">
    //     <img class="thumbnail" src="https://i.vimeocdn.com/video/600595198_390x220.webp" />
    //     <h3 class="video-card-title">Croissants | Flour and Stone</h3>
    //   </a>
    // </div>

    // var cardDiv = document.createElement("div");
    var cardDiv = $("<div>");
    // cardDiv.classList.add("playlist-card");
    cardDiv.addClass("playlist-card");

    // var cardHyperlink = document.createElement("a");
    var cardHyperlink = $("<a>");
    // cardHyperlink.href = "./watch-page/player.html?vId=" + data.id;
    cardHyperlink.attr("href", "./watch-page/player.html?vId=" + data.id);

    // var thumbnail = document.createElement("img");
    var thumbnail = $("<img>");
    // thumbnail.src = data.thumbnail;
    thumbnail.attr("src", data.thumbnail);
    // thumbnail.classList.add("thumbnail");
    thumbnail.addClass("thumbnail");

    // var title = document.createElement("h3");
    var title = $("<h3>");
    // title.classList.add("video-card-title");
    title.addClass("video-card-title");
    // title.innerText = data.title;
    title.text(data.title);

    cardHyperlink.append(thumbnail);
    cardHyperlink.append(title);
    cardDiv.append(cardHyperlink);

    return cardDiv;
  }

  //To make requests we use XMLHTTPRequest Object
  // var xhhtp = new XMLHttpRequest();

  //Configure the request
  // xhhtp.open(
  //   "GET",
  //   "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist",
  //   true
  // );

  //Send request to the backend
  // xhhtp.send();

  //handle response
  // xhhtp.onreadystatechange = function () {
  //   progressBar.css({ display: "block" });
  //   if (xhhtp.readyState === 4) {
  //     progressBar.css({ display: "none", "font-size": "24px" });
  //     console.log(xhhtp.responseText);
  //     var responseArr = JSON.parse(xhhtp.responseText);
  //     for (var i = 0; i < responseArr.length; i++) {
  //       console.log(responseArr[i].title);

  //       var cardDiv = createVideoCard(responseArr[i]);
  //       // cardGrid.appendChild(cardDiv);
  //       cardGrid.append(cardDiv);
  //     }
  //   }
  // };

  function handleSuccessResponse(responseArr) {
    progressBar.css({ display: "none" });
    for (var i = 0; i < responseArr.length; i++) {
      console.log(responseArr[i].title);

      var cardDiv = createVideoCard(responseArr[i]);
      // cardGrid.appendChild(cardDiv);
      cardGrid.append(cardDiv);
    }
  }

  progressBar.css({ display: "block" });
  // $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/playlist", handleSuccessResponse).fail(
  //   function () {
  //     progressBar.css({ display: "none" });
  //     alert("API Call Failed!!");
  //   }
  // );

  $.ajax({
    type: "GET",
    url: "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist",
    success: handleSuccessResponse,
    error: function (request) {
      console.log(request.status);
      if (request.status === 401) {
        //send user to Unauthorized page
      } else if (request.status === 404) {
        //send user to Not Found page
        window.location.assign("./not-found.html");
      } else if (request.status === 500) {
        //send user to Something Went Wrong page
      }
    },
  });

  // $("#main-div").append(
  //   $("<p>").text("Hello World 1..."),
  //   $("<p>").text("Hello World 2..."),
  //   $("<p>").text("Hello World 3..."),
  //   $("<p>").text("Hello World 4..."),
  //   $("<p>").text("Hello World 5...")
  // );

  // $("#main-div > p").on({
  //   click: function () {
  //     alert("Para Clicked!!");
  //   },
  //   mouseover: function () {
  //     console.log("Mouse Over");
  //   },
  // });
});
