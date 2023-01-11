// Récupération des vidéos
let url = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLC8UWZPWDAiUFzH1jWz6zJpAiYxN1iJvP&key=AIzaSyApzqJ9JKhMLXHPm7qJk66cvAOE4QvL1uU";
const playlist = document.getElementById("playlist");
let nextPageToken;

async function getPlaylist(url) {
    const request = await fetch(url, {
        method: 'GET'
    });

    if (!request.ok) {
        alert("Problème d'appel de l'API");
    } else {
        let data = await request.json();

        data.items.forEach(e => {
            var video = document.createElement("div");
            var videoThumbnail = document.createElement("img");
            var videoTitle = document.createElement("h3");
            var videoDesc = document.createElement("p");

            video.className = "video";
            video.id = `${ e.snippet.resourceId.videoId }`
            videoThumbnail.className = "videoThumbnail";
            videoTitle.className = "videoTitle";
            videoDesc.className = "videoDesc";

            videoThumbnail.src = e.snippet.thumbnails.maxres.url;
            videoTitle.innerText = e.snippet.title;
            videoDesc.innerText = e.snippet.description;

            playlist.append(video);
            video.append(videoThumbnail);
            video.append(videoTitle);
            video.append(videoDesc);
        });
        
        if (typeof data.nextPageToken !== 'undefined') {
            nextPageToken = data.nextPageToken;

            url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=PLC8UWZPWDAiUFzH1jWz6zJpAiYxN1iJvP&key=AIzaSyApzqJ9JKhMLXHPm7qJk66cvAOE4QvL1uU`;
            getPlaylist(url);
        }
    }
}
getPlaylist(url);

playlist.addEventListener("click", (e) => {
    let urlVideo;
    const layer = document.getElementById("layer");
    const player = document.createElement("iframe");
    player.id = "player";
    
    e.target.parentNode.id == "playlist" ? urlVideo = e.target.id : urlVideo = e.target.parentNode.id;

    player.src = `https://www.youtube.com/embed/${urlVideo}`;
    player.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    player.allowFullscreen = true;

    layer.style.display = "flex";
    layer.append(player);

    layer.addEventListener("click", () => {
        layer.style.display = "none";
        layer.firstChild.remove();
    })
})

