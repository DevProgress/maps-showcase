$(function() {
  function EnterState(){
    var stateCode = $(this).attr('id');
    $('g[id=' + stateCode+ ']').addClass('active');

  };
  function LeaveState(){
    var stateCode = $(this).attr('id');
    $('g[id=' + stateCode+ ']').removeClass('active');
  };

  function ShowState(){
    var id = $(this).attr('id');
    modalController.showState(id);
  }

  $('g.mini-state-bubble').mouseenter(EnterState);
  $('g.mini-state-bubble').mouseleave(LeaveState);
  $('g.mini-state-bubble').click(ShowState);

  $('#map-states g').each(function(){
    var stateCode = $(this).attr('id');
    var stateName = states_data[stateCode].stateName;
    $(this).tooltip({title:stateName, container:'body'});
  });

});
