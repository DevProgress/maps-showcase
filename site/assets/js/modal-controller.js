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
    // hack together from hacky demo data
    var title;
    var description;
    d3.json("assets/data/showcase-text.json", function(error, listOfDicts) {
      for (var i=0;i<listOfDicts.length;i++) {               
        var stateName = listOfDicts[i]["State Year"].split(" ")[0];
        if (stateName == state_names[state.stateCode]) {
          title = listOfDicts[i]["Title"]
          description = listOfDicts[i]["Description"]
          if (title) {
            document.getElementById('historical-artifact-data').innerText = title + " - " + description;
          } else {
            document.getElementById('historical-artifact-data').innerText = description;
          }
          break;
        }
      }
    });

    document.getElementById('historical-artifact-image').src = state.historicalArtifactImage;
    document.getElementById('historical-artifact-image').title = state.historicalArtifactImageTitle;
    document.getElementById('pattern-image').src = state.patternImage;
    document.getElementById('pattern-image').title = state.patternImageTitle;
    document.getElementById('pattern-data').innerText = state.patternData;
    document.getElementById('state-title').innerText = state_names[state.stateCode];
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
