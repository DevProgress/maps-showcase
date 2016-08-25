var states_data;

d3.json("data/gen/states-data.json", function(error, info) {
  states_data = info;
});


var modalController = (function () {

  var modal = document.getElementById('mainModal');
  var background = document.getElementById('modalBackdrop');

  var hideModal = function () {
    modal.className = 'modal fade';
    background.className = 'modal-backdrop fade';

    setTimeout(function () {
      modal.style.display = 'none';
    }, 250); //long enough for animation to wrap up

    g.selectAll("path").classed("active", false);
  };

  var populateStateData = function (state) {
    document.getElementById('historical-artifact-image').src = 'img/artwork/' + state.stateCode + '/' + modalController.stateIndex + '.png';
    // state.historicalArtifactImage;
    document.getElementById('pattern-image').src = 'img/pattern/' + state.stateCode + '/' + modalController.stateIndex + '.png';
    // state.patternImage;

    document.getElementById('historical-artifact-image').title = state.title;
    document.getElementById('pattern-image').title = state.title;
    document.getElementById('pattern-data').innerText = state.patternData;
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
    document.getElementById('nextButton').disabled = hasSingleImage;
    document.getElementById('prevButton').disabled = hasSingleImage;

  };

  var nextState = function () {
    modalController.stateIndex += 1;
    populateStateData(modalController.state);
  }

  var previousState = function () {
    modalController.stateIndex -= 1;
    populateStateData(modalController.state);
  }

  return {
    showState: showState,
    hideModal: hideModal,
    nextState: nextState,
    previousState: previousState
  }

})();