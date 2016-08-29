var videoModalController = (function () {
  var modal = document.getElementById('videoModal');
  var background = document.getElementById('videoModalBackdrop');

  var hideModal = function () {
    modal.className = 'modal fade';
    background.className = 'modal-backdrop fade';
    selectedStateIdx = null;
    document.getElementsByTagName('video')[0].pause();

    setTimeout(function () {
      modal.style.display = 'none';
    }, 250); //long enough for animation to wrap up
  };

  var playVideo = function () {
    document.getElementById('overlayImage').style.display = 'none';
    document.getElementsByTagName('video')[0].style.display = 'block';
    document.getElementsByTagName('video')[0].play();
  };


  return {
    hideModal: hideModal,
    playVideo: playVideo
  }

})();

function showAndPlayVideo(video_id) {
  var videoFrame = document.getElementById('video_iframe'); 
  videoFrame.style.display='block'; 
  document.getElementById('overlayImage').style.display='none';
  var video_url = 'https://www.youtube.com/embed/' + video_id + '?autoplay=1&controls=0&showinfo=0&loop=1&playlist=' + video_id;
  document.getElementById('video_iframe').src = video_url;
}
