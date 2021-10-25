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

sortlist();
