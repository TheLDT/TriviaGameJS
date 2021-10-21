var doc = document;
var left = document.getElementById("spiral-pupil-left");
var right = document.getElementById("spiral-pupil-right");
var rotation = 0;
doc.addEventListener('mousemove', e => {
  rotation += 10;
  if(rotation === 360) rotation = 0;
  left.style.transform = `rotate(${rotation}deg)`;
  right.style.transform = `rotate(${rotation}deg)`;
  /*
  follow cursor (cant make it work with every resolution)
  var x = 525;
  if(e.pageY-260<-80){
    left.style.y = e.pageY-260;
    right.style.y = e.pageY-260;
  }
  if(e.pageX-x<0 && e.pageX-x>-350){
    left.style.x  = e.pageX - x;
    right.style.x = e.pageX - x+ 40;
  }
  */
});
// source: https://stackoverflow.com/a/5248375/11782548
function sortlist() {
  let cl = document.getElementById('setupCategory');
  let clTexts = new Array();

  for(i = 1; i < cl.length; i++) {
    clTexts[i-1] =
      cl.options[i].text.toUpperCase() + "," +
      cl.options[i].text + "," +
      cl.options[i].value + "," +
      cl.options[i].selected;
 }

 clTexts.sort();

  for(i = 1; i < cl.length; i++) {
    let parts = clTexts[i-1].split(',');

    cl.options[i].text = parts[1];
    cl.options[i].value = parts[2];
    if(parts[3] == "true") {
        cl.options[i].selected = true;
    } else {
       cl.options[i].selected = false;
    }
  }
}

function setTheme(){
  let curTheme = window.localStorage.getItem("theme");
  let default_ = curTheme.split("-")[0];
  let current_ = curTheme.split("-")[1];
  if(default_ === "dark" && current_ === "light") {
      document.body.classList.add("light-theme");
  } else if (default_ === "light" && current_ === "dark"){
      document.body.classList.add("dark-theme");
  }
}

setTheme();

function themeToggle(){
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  let theme = "light-theme";
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
      theme = "dark-light";
    } else {
      theme = "dark-dark";
    }
  } else {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      theme = "light-dark";
    } else {
      theme = "light-light";
    }
  }
  window.localStorage.setItem("theme", theme);
}

sortlist();
