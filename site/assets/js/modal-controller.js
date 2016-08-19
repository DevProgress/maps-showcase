var states_data;

d3.json("assets/gen/states-data.json", function(error, info) {
  states_data = info;
});

var modalController = (function () {

  var selectedStateIdx = null;

  var modal = document.getElementById('mainModal');
  var background = document.getElementById('modalBackdrop');

  var hideModal = function () {
    modal.className = 'modal fade';
    background.className = 'modal-backdrop fade';
    selectedStateIdx = null;

    setTimeout(function () {
      modal.style.display = 'none';
    }, 250); //long enough for animation to wrap up

    g.selectAll("path").classed("active", false);
  };

  var populateStateData = function (state) {

    document.getElementById('historical-artifact-image').src = state.historicalArtifactImage;
    document.getElementById('historical-artifact-image').title = state.historicalArtifactImageTitle;
    document.getElementById('pattern-image').src = state.patternImage;
    document.getElementById('pattern-image').title = state.patternImageTitle;
    document.getElementById('pattern-data').innerText = state.patternData;
    document.getElementById('state-title').innerText = state.stateName;
    document.getElementById('historical-artifact-image-title').innerText = state.historicalArtifactImageTitle;
    document.getElementById('historical-artifact-data').innerText = state.historicalArtifactData;
  }

  var showState = function (state) {
    selectedStateIdx = state.id;
    modal.style.display = 'block';
    setTimeout(function () {
      modal.className = 'modal fade in';
      background.className = 'modal-backdrop fade in';
    }, 50); //long enough to be at least one animation frame, so that the animation triggers
    populateStateData(state);
  };

  var nextState = function () {
    g.selectAll("path").classed("active", false);

    selectedStateIdx += 1;
    // because state ids are not contiguous
    while(!states_data.hasOwnProperty(selectedStateIdx)){
      selectedStateIdx += 1;
      if (selectedStateIdx >= 57){
        selectedStateIdx = 1;
      }
    }

    g.selectAll("path").filter(function (d) { return d.id === selectedStateIdx;}).classed("active", true)
    var state = states_data[selectedStateIdx];
    state.id = selectedStateIdx;
    populateStateData(state);
  }

  var previousState = function () {
    g.selectAll("path").classed("active", false);


    selectedStateIdx -= 1;
    // because state ids are not contiguous
    while(!states_data.hasOwnProperty(selectedStateIdx)){
      selectedStateIdx -= 1;
      if (selectedStateIdx <= 0){
        selectedStateIdx = 56;
      }
    }

    g.selectAll("path").filter(function (d) { return d.id === selectedStateIdx;}).classed("active", true)
    var state = states_data[selectedStateIdx];
    state.id = selectedStateIdx;
    populateStateData(state);
  }

  return {
    showState: showState,
    hideModal: hideModal,
    nextState: nextState,
    previousState: previousState
  }

})();
