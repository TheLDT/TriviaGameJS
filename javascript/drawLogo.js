document.write('\
<div class="toggle-theme">\
</div>\
<div class="title" >\
  <svg id="logoSVG" width="150" height="150" viewbox="0 0 250 250" onclick="themeToggle()">\
    <use xlink:href="#logo"></use>\
  </svg>\
  <h2 class="logo-text">♣️ Trivia Game ♠️</h2>\
</div>\
<svg class="svgToHide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" >\
  <defs>\
   <clipPath id="left">\
    <circle class="clipPath" r="25" cx="70" cy="125"/>\
   </clipPath>\
   <clipPath id="right">\
    <circle class="clipPath" r="25" cx="180" cy="125"/>\
   </clipPath>\
  </defs>\
  <symbol id="logo" class="logo">\
    <circle class="sun" r="120" cx="125" cy="125"/>\
    <circle class="eye" r="28" cx="70" cy="125"/>\
    <circle class="eye" r="28" cx="180" cy="125"/>\
    <image id="spiral-pupil-left" class="spiral-pupil-left" href="images/spiral.jpg"\
    x="-235" y="-180" clip-path="url(#left)" />\
    <image id="spiral-pupil-right" class="spiral-pupil-right" href="images/spiral.jpg"\
    x="-125" y="-180" clip-path="url(#right)" />\
    <path class="mouth" d="M115 140 A20 20 0 1 0 135 140 10 10 0 1 1 115 140z"/>\
  </symbol>\
</svg>\
');
