$(function() {
  function EnterState(){
    var stateCode = $(this).attr('id');
    $('g[id=' + stateCode+ ']').addClass('active');

  };
  function LeaveState(){
    var stateCode = $(this).attr('id');
    $('g[id=' + stateCode+ ']').removeClass('active');
  };

  $('g.mini-state-bubble').mouseenter(EnterState);
  $('g.mini-state-bubble').mouseleave(LeaveState);

});
