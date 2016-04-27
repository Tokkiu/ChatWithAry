var chat=angular.module('chat',[

]);
var info=new Wilddog('http://chatwithbobot.wilddogio.com');
var infoSet=info.child('chatInfo');

function setTest() {

infoSet.update({
  1:{
    time:'444',
    text:'egeg',
    src:'ttt'
  }
});
}
function showzhao() {
  //var paiming=Math.round((speed)/70 * 10000) / 100.00 ;
  $('.theme-popover-mask').fadeIn(100);
  $('#zhezhao1').slideDown(200);
  //document.getElementById("result").innerHTML="<h3>"+paiming+"<h3>";
  // $('#result').innerHTML="<h3>"+paiming+"<h3>";
  //console.log(paiming);
}
function close() {
  $('.theme-popover-mask').fadeOut(100);
  $('#zhezhao2').slideUp(200);
  //holdon();
}
