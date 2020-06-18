// $(document).ready(function() {
//     function getVideoDataFromBackend(id, pos) {
//         $.get('http://5d76bf96515d1a0014085cf9.mockapi.io/video/'+id, function(data) {
//             $('.playlist-card').removeClass('active-card');
//             $('#card'+(pos+1)).addClass('active-card');
//             $('#video-player').attr('src', 'https://player.vimeo.com/video/' + data.vimeoId);
//             $('#views-count').html(data.views);
//             $('#video-title').html(data.title);
//             $('#video-description').html(data.description);

//             $(window).scrollTop(0);
//         })
//     }

//     function createPlaylistCard(obj, pos) {
//         // <div id="card6" class="playlist-card">
//         //     <img class="thumbnail" src="https://i.vimeocdn.com/video/537261616_390x220.jpg" />
//         //     <h3 class="video-card-title">Lemony Chicken Noodle Soup</h3>
//         // </div>

//         var mainDiv = document.createElement('div');
//         mainDiv.id = 'card' + obj.id;
//         mainDiv.classList.add('playlist-card');

//         if(pos === 0) {
//             mainDiv.classList.add('active-card');
//         }

//         var thumbnail = document.createElement('img');
//         thumbnail.classList.add('thumbnail');
//         thumbnail.src = obj.thumbnail;

//         var title = document.createElement('h3');
//         title.classList.add('video-card-title');
//         title.innerHTML = obj.title;

//         mainDiv.appendChild(thumbnail);
//         mainDiv.appendChild(title);

//         mainDiv.onclick = function() {
//             getVideoDataFromBackend(obj.id, pos);
//         }

//         return mainDiv;
//     }

//     $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/playlist', function(data) {
//         $('#playlist-wrapper').html('');

//         for(var i=0; i<data.length; i++) {
//             $('#playlist-wrapper').append(createPlaylistCard(data[i], i));
//         }
//     })
// })

// =================================================

var videoId = window.location.search.split("=")[1];
var videoPlayer = document.getElementById("video-player");
var views = document.getElementById("views-count");
var title = document.getElementById("video-title");
0;
var description = document.getElementById("video-description");
var playlistWrapper = document.getElementById("playlist-wrapper");

function createVideoCard(data) {
  // <div class="playlist-card active-card">
  //   <a href="./watch-page/player.html">
  //     <img class="thumbnail" src="https://i.vimeocdn.com/video/600595198_390x220.webp" />
  //     <h3 class="video-card-title">Croissants | Flour and Stone</h3>
  //   </a>
  // </div>

  var cardDiv = document.createElement("div");
  cardDiv.classList.add("playlist-card");

  var cardHyperlink = document.createElement("a");
  cardHyperlink.href = "./player.html?vId=" + data.id;

  var thumbnail = document.createElement("img");
  thumbnail.src = data.thumbnail;
  thumbnail.classList.add("thumbnail");

  var title = document.createElement("h3");
  title.classList.add("video-card-title");
  title.innerText = data.title;

  cardHyperlink.appendChild(thumbnail);
  cardHyperlink.appendChild(title);
  cardDiv.appendChild(cardHyperlink);

  return cardDiv;
}

function getPlaylistData() {
  var httpPlaylist = new XMLHttpRequest();
  httpPlaylist.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist",
    true
  );
  httpPlaylist.send();

  httpPlaylist.onreadystatechange = function () {
    if (httpPlaylist.readyState === 4) {
      var response = JSON.parse(httpPlaylist.responseText);

      for (var i = 0; i < response.length; i++) {
        var videoCard = createVideoCard(response[i]);
        playlistWrapper.appendChild(videoCard);
      }
    }
  };
}

var xhttp = new XMLHttpRequest();
xhttp.open(
  "GET",
  "http://5d76bf96515d1a0014085cf9.mockapi.io/video/" + videoId,
  true
);
xhttp.send();

xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4) {
    var response = JSON.parse(xhttp.responseText);
    console.log(response);

    videoPlayer.src = "https://player.vimeo.com/video/" + response.vimeoId;
    views.innerHTML = response.views;
    title.innerHTML = response.title;
    description.innerHTML = response.description;

    getPlaylistData();
  }
};
