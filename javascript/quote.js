var url;

function getQuote() {
  url = "https://en.wikiquote.org/w/api.php?action=parse&format=json&page=Template%3AQoD&prop=text";
  //&origin=* fixes CORS
  url += "&origin=*";

  const d = new Date();
  let today = d.getUTCFullYear() + "/" + (d.getUTCMonth()+1) + "/" +d.getUTCDate();
  if(window.localStorage.getItem("quoteDay") === today){
    console.log("Loading storred quote");
    document.getElementById("quoteDiv").innerHTML = window.localStorage.getItem("quote");
  } else {
    loadJSON(function(response) {
        const json = JSON.parse(response).parse;
        document.getElementById("quoteDiv").innerHTML = createQuote(json);
    });
  }
}

function getQuotePortion(text, title){
  //console.log(text);
  let tmp = document.createElement("DIV");
  tmp.innerHTML = text;
  let lis = tmp.getElementsByTagName("li");
  let potentialQuotes = [];
  for(i = 0;i < lis.length ;i++){
    let element = lis[i];
    if(!element.classList.value.includes("toclevel")){
      potentialQuotes[potentialQuotes.length] = element;
      console.log(element);
      //maybe add <li> counter for when there are not extra dots
      console.log(element.removeChild(element.lastElementChild));
      //multiline stuff doesnt work
      //should scrap that project for a different one
      break;
    }
  }

  if(potentialQuotes.length === 0) return "";
  return potentialQuotes[0].innerText + `<br><p class="quoter">
  <a href="https://en.wikiquote.org/wiki/${title}" target="_blank">${title}</a></p>`;
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); //true == asynchronous, false == synchronous

    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function createQuote(json){
  let tmp = document.createElement("DIV");
  tmp.innerHTML = json.text['*'];
  let tmpTxt =  tmp.innerText.replace("~","<br><p class=\"quoter\">");
  tmpTxt = tmpTxt.replace("~","</p>");
  tmpTxt = tmpTxt.replace("\n","");
  const d = new Date();
  let today = d.getUTCFullYear() + "/" + (d.getUTCMonth()+1) + "/" +d.getUTCDate();
  window.localStorage.setItem("quoteDay", today);
  window.localStorage.setItem("quote", tmpTxt.trim());
  return tmpTxt.trim();
}

getQuote();
