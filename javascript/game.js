var playing = false;
var json = null;
var total_right = 0;
var total_count = 0;
var total = 0; var category; var difficulty;
var apicall = "";
var currentQuestion;
var stats = [];
//later on put quick start button

function createApiCall(data, playAgain) {
  document.getElementById("setupDiv").style.display = "none";
  if (!playAgain) {
    total = data[0].value;
    if (total > 50) {
      total = 50;
    } else if (total < 0) {
      total = 1;
    }
    category = data[1].value;
    difficulty = data[2].value;
  } else {
    document.getElementById("endGameDiv").style.display = "none";
    document.getElementById("questionsDiv").style.display = "grid";
    stop(playAgain);
  }

  apicall = `https://opentdb.com/api.php?amount=${total}&category=${category}&difficulty=${difficulty}&type=multiple`;
  toggle();
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', apicall, true); //true == asynchronous, false == synchronous
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4) {
      if (xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return
        //a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      } else {
        document.getElementById("result").innerHTML = `Error while loading, opentdb.com must be down...`;
      }
    }
  };
  xobj.send(null);
}

function toggle() {
  if (!playing) {
    document.getElementById("gameDiv").style.display = "grid";
    document.getElementById("result").innerHTML = `Loading...`;
    newQuestion();
    playing = true;
  } else {
    document.getElementById("result").innerHTML = check();
    if (total_count < total) {
      newQuestion();
    } else {
      document.getElementById("endGameDiv").style.display = "grid";
      document.getElementById("questionsDiv").style.display = "none";
      document.getElementById("endGameMessage").innerHTML =
        `Game over! You had ${total_right} correct out of ${total} questions!
      (${(total_right / total) * 100}%)`;
      writeStats();
    }
  }
}

function writeStats() {
  let listElement = document.createElement('ol'),
    listItem, temp;
  let statList = document.getElementById("endGameStats");
  //cleanup the list
  while (statList.firstChild) statList.firstChild.remove();
  statList.appendChild(listElement);
  for (i = 0; i < stats.length; i++) {
    temp = document.createElement('li');
    listItem = document.createElement('p');
    listItem.className = "endGameAnswer";
    listItem.innerHTML = stats[i].difficulty;
    //for(j = stats[i].difficulty.length; j<3; j++) listItem.innerHTML += "󠀠🟊"; // TODO: allign late
    listItem.innerHTML += stats[i].question + "\n";
    listItem.innerHTML += "Your Answer: " + stats[i].your_answer;
    if (stats[i].correct) {
      listItem.classList.add("correct-answer");
    } else {
      listItem.classList.add("wrong-answer");
      listItem.innerHTML += "\nCorrect Answer: " + stats[i].correct_answer;
    }
    temp.appendChild(listItem);
    listElement.appendChild(temp);
  }
  //document.getElementById("endGameStats").innerHTML = ;
}

function initJSON() {
  loadJSON(function (response) {
    json = JSON.parse(response).results;
    document.getElementById("fieldset").style.display = "grid";
    document.getElementById("result").innerHTML = `New Game! (${total} Questions)`;
    newQuestion();
  });
}

function newQuestion() {
  if (json === null) {
    initJSON();
  } else {
    document.getElementById("gameDiv").style.display = "grid";
    var rand = Math.floor(Math.random() * json.length);
    //source: https://stackoverflow.com/a/46545530/11782548
    var unshuffled = ["1", "2", "3", "4"];

    var shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    var ans1 = "ans" + shuffled[0];
    var ans2 = "ans" + shuffled[1];
    var ans3 = "ans" + shuffled[2];
    var ans4 = "ans" + shuffled[3];

    document.getElementById("ques").innerHTML = json[rand].question;
    document.getElementById("qdCategory").innerHTML = json[rand].category;
    var difficulty;
    switch (json[rand].difficulty) {
      case "easy":
        difficulty = "⭐";
        break;
      case "medium":
        difficulty = "⭐⭐";
        break;
      case "hard":
        difficulty = "⭐⭐⭐";
        break;
      default:
        difficulty = "❓";
    }

    document.getElementById("qdDifficulty").innerHTML = difficulty;
    document.getElementById("qdCategory").innerHTML = json[rand].category;
    document.getElementById("legend").innerHTML = "Question " + " " + (total_count + 1) + "/" + total;
    document.querySelector("label[for=" + ans1 + "]").innerHTML = json[rand].correct_answer;
    document.querySelector("label[for=" + ans2 + "]").innerHTML = json[rand].incorrect_answers[0];
    document.querySelector("label[for=" + ans3 + "]").innerHTML = json[rand].incorrect_answers[1];
    document.querySelector("label[for=" + ans4 + "]").innerHTML = json[rand].incorrect_answers[2];
    currentQuestion = json[rand];

    json.splice(rand, 1);
  }
}

function check() {
  var ans = document.querySelector('input[name="ans"]:checked');
  var result = document.getElementById("result");
  var find = document.querySelector(`label[for=${ans.id}]`);
  total_count += 1;
  ans.checked = false;
  let object = new Object();
  object.question = currentQuestion.question;
  object.correct_answer = fix(currentQuestion.correct_answer);
  object.difficulty = document.getElementById("qdDifficulty").innerHTML;
  object.your_answer = find.innerHTML;
  if (find.innerHTML === object.correct_answer) {
    result.classList.add("correct-answer");
    result.classList.remove("wrong-answer");
    total_right += 1;
    object.correct = true;
    stats[stats.length] = object;
    return "You are correct";
  } else {
    result.classList.add("wrong-answer");
    result.classList.remove("correct-answer");
    object.correct = false;
    stats[stats.length] = object;
    return "You are wrong";
  }
}

function fix(answer) {
  let p = document.createElement("p");
  p.innerHTML = answer;
  return p.innerHTML;
}

function stop(playAgain) {
  let result = document.getElementById("result");
  result.classList.remove("wrong-answer");
  result.classList.remove("correct-answer");
  result.classList.add("default-answer");
  total_right = 0;
  total_count = 0;
  playing = false;
  json = null;
  stats = [];
  if (!playAgain) {
    window.location.replace("index.html");
  }
}
