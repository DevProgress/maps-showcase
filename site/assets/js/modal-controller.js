var modalController = (function () {
  var states = {
    MA: {
      name: 'Massachusetts'
    },
    CA: {
      name: 'California'
    }
  };

  var stateList = ['CA', 'MA'];
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
  };

  var populateStateData = function (state) {
    selectedState = state;
    var stateData = states[state];
    selectedStateIdx = stateList.indexOf(state);

    //TODO: populate the rest of this modal
    document.getElementById('state-title').innerText = stateData.name;
  }

  var showState = function (state) {
    modal.style.display = 'block';
    setTimeout(function () {
      modal.className = 'modal fade in';
      background.className = 'modal-backdrop fade in';
    }, 50); //long enough to be at least one animation frame, so that the animation triggers
    populateStateData(state);
  };

  var nextState = function () {
    if (selectedStateIdx >= stateList.length - 1) return;
    populateStateData(stateList[selectedStateIdx + 1]);
  }

  var previousState = function () {
    if (selectedStateIdx == 0) return;
    populateStateData(stateList[selectedStateIdx - 1]);
  }

  return {
    showState: showState,
    hideModal: hideModal,
    nextState: nextState,
    previousState: previousState
  }

})();