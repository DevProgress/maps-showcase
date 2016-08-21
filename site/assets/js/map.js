var stage = document.getElementById('stage');
$stage = jQuery(stage);
var manager = new Hammer.Manager(stage);
var Pan = new Hammer.Pan();
var Pinch = new Hammer.Pinch();

manager.add(Pan);
manager.add(Pinch);
var liveScale = 0.1;
var deltaX = 0;
var deltaY = 0;
manager.on('panmove', function (e) {
    var dX = deltaX + e.deltaX;
    var dY = deltaY + e.deltaY;
    $.Velocity.hook($stage, 'translateX', dX + 'px');
    $.Velocity.hook($stage, 'translateY', dY + 'px');
});
manager.on('panend', function (e) {
    deltaX = deltaX + e.deltaX;
    deltaY = deltaY + e.deltaY;
});
var currentScale = 1;
function getRelativeScale(scale) {
    return scale * currentScale;
}
manager.on('pinchmove', function (e) {
    var scale = getRelativeScale(e.scale);
    $.Velocity.hook($stage, 'scale', scale);
});
manager.on('pinchend', function (e) {
    currentScale = getRelativeScale(e.scale);
    liveScale = currentScale;
});
