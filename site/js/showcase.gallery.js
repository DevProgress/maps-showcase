var states_data;

d3.json("data/gen/states-data.json?v1", function(error, info) {
  states_data = info;
});

var modalController = (function () {

  var modal = document.getElementById('mainModal');
  var background = document.getElementById('modalBackdrop');
  
  var initialize = function () {
    var imageLoaded = function () {
      // Hack around a bug in iOS Safari where a height change doesn't
      // automatically recalculate the scrollable height.
      // <https://bugs.webkit.org/show_bug.cgi?id=150974>
      document.getElementById('mainModal').style.overflowY = 'hidden';
      setTimeout(function () {
        document.getElementById('mainModal').style.overflowY = '';
      }, 10);
    };
    document.getElementById('pattern-image').addEventListener('load', imageLoaded);
    document.getElementById('historical-artifact-image').addEventListener('load', imageLoaded);
  };

  var hideModal = function () {
    modal.className = 'modal fade';
    background.className = 'modal-backdrop fade';

    setTimeout(function () {
      modal.style.display = 'none';
    }, 250); //long enough for animation to wrap up

    // when modal hides, re-allow body to scroll
    document.getElementsByTagName("body")[0].className = "";
  };

  var populateStateData = function (state) {

    document.getElementById('mainModal').setAttribute('data-state-code', state.stateCode);
    document.getElementById('historical-artifact-image').src = 'img/artwork/' + state.stateCode + '/' + modalController.stateIndex + '.jpg';
    // state.historicalArtifactImage;
    document.getElementById('pattern-image').src = 'img/pattern/' + state.stateCode + '/' + modalController.stateIndex + '.png';
    // state.patternImage;

    document.getElementById('historical-artifact-image').title = state.title;
    document.getElementById('pattern-image').title = state.title;
    document.getElementById('pattern-data').innerText = 'Pattern';
    document.getElementById('download-pdf').href = 'data/download-pdf/' + state.stateCode + '.pdf';
    document.getElementById('state-title').innerText = state.stateName;
    document.getElementById('historical-artifact-image-title').innerText = state.title;
    document.getElementById('historical-artifact-data').innerText = state.description;
  }

  var showState = function (stateID) {
    modalController.stateIndex = 1;
    modalController.state = states_data[stateID]; // hard code kansas
    modal.style.display = 'block';
    setTimeout(function () {
      modal.className = 'modal fade in';
      background.className = 'modal-backdrop fade in';
    }, 50); //long enough to be at least one animation frame, so that the animation triggers
    populateStateData(modalController.state);

    var hasSingleImage = (modalController.state.patternCount <= 1 && modalController.state.artworkCount <= 1);

    document.getElementsByTagName("body")[0].className = "modal-open";
  };

  var nextState = function () {
    var stateCode = document.getElementById('mainModal').getAttribute('data-state-code');
    var currentIndex = getStateIndex(stateCode);
    var nextIndex = currentIndex + 1;
    var nextCode = Object.keys(states_data)[nextIndex];
    if (!nextCode)
      nextCode = Object.keys(states_data)[0];
    showState(nextCode);
  }

  var previousState = function () {
    var stateCode = document.getElementById('mainModal').getAttribute('data-state-code');
    var currentIndex = getStateIndex(stateCode);
    var prevIndex = currentIndex - 1;
    var prevCode = Object.keys(states_data)[prevIndex];
    if (!prevCode)
      prevCode = Object.keys(states_data)[Object.keys(states_data).length - 1];
    showState(prevCode);
  }

  var getStateIndex = function(code){
    var index = 0;
    for (var property in states_data) {
        if (states_data.hasOwnProperty(property)) {
            if (property === code)
              return index;
        }
        index++;
    }
    return index;
  }

  return {
    initialize: initialize,
    showState: showState,
    hideModal: hideModal,
    nextState: nextState,
    previousState: previousState
  }

})();
