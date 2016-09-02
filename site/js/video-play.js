var TAG_ID = 'player';

var videoId = document.getElementById(TAG_ID).getAttribute('data-video-id');
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  new YT.Player(TAG_ID, {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      'onReady': function onPlayerReady(event) {
        event.target.playVideo();
      }
    },
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playlist: videoId, // required for looping
      playsinline: 1,
      rel: 0,
      showinfo: 0
    }
  });
}
