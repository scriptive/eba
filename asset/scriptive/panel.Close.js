// var elm = doc.querySelector('.testing_check_before_you_delete');
// if (elm){
//   new Hammer(elm).on('tap', function(evt) {
//     var e = evt.target;
//     console.log(e);
//     evt.preventDefault();
//   });
//   console.log('yes');
// }
// var touchstartPanel = function(e){
//   e.preventDefault();
//   panel.Toggle(config.widthMin);
//   $.on(3);
//   eMain.removeEventListener('touchstart', touchstartPanel, true);
// };
//
// eMain.addEventListener('touchstart', touchstartPanel, true);
if (!config.mainActive) return;
var abc = eMain.querySelector(config.mainActive);
// var abc = eMain.getElementsByClassName('lmSB')[0];
var touchstartPanel = function(e){
  e.preventDefault();
  panel.Toggle(config.widthMin);
  $.on(3);
  abc.removeEventListener('touchstart', touchstartPanel, true);
};
abc.addEventListener('touchstart', touchstartPanel, true);