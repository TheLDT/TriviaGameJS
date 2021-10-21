function toggleForm(){
  document.getElementById("createDiv").style.display= "block";
  document.getElementById("gameDiv").style.display= "none";
  document.getElementById("createForm").reset();
}

function createForm(data){
  document.getElementById("tooltiptext").innerHTML = "Click to copy!";
  var all = data[7].value;
  var cat,dif, q,c,w1,w2,w3, hasEmpty = false;


  if(all === ""){
    data[7].className = "empty";
    for(i = 0; i < 5; i++){
      if(data[i].value == ""){
        data[i].className = "empty";
        hasEmpty = true;
      } else {
        data[i].className = "";
      }
    }
    if(hasEmpty){
      return;
    }
    q = data[0].value;
    c = data[1].value;
    w1 = data[2].value;
    w2 = data[3].value;
    w3 = data[4].value;
    cat = data[5].value || "Other";;
    dif = data[6].value || "Unspecified";;
  } else {
    var split = all.split("/");
    q = split[0];
    c = split[1];
    w1 = split[2];
    w2 = split[3];
    w3 = split[4];
    cat = split[5] || "Other";
    dif = split[6] || "Unspecified";
  }
  var obj = new Object();
  obj.category = cat;
  obj.difficulty = dif;
  obj.question = q;
  obj.correct_answer = c;
  obj.incorrect_answers = [w1,w2,w3];
  var result = JSON.stringify(obj);
  document.getElementById("createResult").value += result + ",";
}

function copyCreate(){
  var copyText = document.getElementById("createResult");
  document.getElementById("tooltiptext").innerHTML = "Copied!!";
  copyText.select();
  document.execCommand("copy");
}

function clearResult(){
    document.getElementById("createResult").value = "";
}
