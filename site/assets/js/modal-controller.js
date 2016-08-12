var modalController = (function () {
  var states = {
    MA: {
      name: 'Massachusetts'
    }
  };

  var modal = document.getElementById('mainModal');
  var background = document.getElementById('modalBackdrop');

  var hideModal = function () {
    modal.className = 'modal fade';
    background.className = 'modal-backdrop fade';

    setTimeout(function () {
      modal.style.display = 'none';
    }, 250); //long enough for animation to wrap up
  };

  var showState = function (state) {
    var stateData = states[state];
    modal.style.display = 'block';
    setTimeout(function () {
      modal.className = 'modal fade in';
      background.className = 'modal-backdrop fade in';
    }, 50); //long enough to be at least one animation frame, so that the animation triggers

    //TODO: populate the rest of this modal
    document.getElementById('state-title').innerText = stateData.name;
  };

  return {
    showState: showState,
    hideModal: hideModal
  }

})();