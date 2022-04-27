console.log("This is magic notes app");
showNotes();

// User add notes , in localStorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  var action = document.getElementById("action");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let titleTxtObj = {
    title: addTitle.value,
    text: addTxt.value,
  };

  if ( addTxt.value == null || addTxt.value == "" || addTitle.value == null || addTitle.value == "") {
    alert("Nothing to show! Please add valid title and note");
  } 
  else {
    notesObj.push(titleTxtObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    action.innerText = "";
    showNotes();
  }
});

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = ${index} href="#" onclick= "deleteNode(this.id)" class="btn btn-primary">Delete note</button>
          </div>
        </div>
        `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use add note section to above to add notes`;
  }
}

//  function to delete Node

function deleteNode(index) {
  console.log(`i am deleting ${index}`);

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search function

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});


 //   Voice recognition function

function runSpeechRecognition() {
    
   
    let addTxt = document.getElementById("addTxt");
    var action = document.getElementById("action");

    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.interimResults = true;
   
    // start recognition
    recognition.start()

    recognition.onstart = function() {
        action.innerText = "listening, please speak...";
    }
    
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        addTxt.value = transcript 
    }
    
    recognition.onspeechend = function() {
        action.innerText = "stopped listening, hope you are done...";
        recognition.stop();
    }

    
}
