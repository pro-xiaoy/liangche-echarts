function setRem(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  
  const htmlDom = document.getElementsByTagName('html')[0];

  htmlDom.style.fontSize = ( 16 * htmlWidth/375 ) + 'px';
}
// rem 适配
window.onresize = function(){
  setRem()
}
