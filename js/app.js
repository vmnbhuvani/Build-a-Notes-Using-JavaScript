showNotes();
let addTxt = document.getElementById('addTxt');
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {

      if (addBtn.innerText == "Add Note") {
            let notes = localStorage.getItem('notes');

            if (notes == null) {
                  notesObj = [];
            } else {
                  notesObj = JSON.parse(notes);
            }

            notesObj.push(addTxt.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            addTxt.value = "";
            showNotes();
            displayMessage("Note added successfully")
      }
      else if (addBtn.innerText == "Update Note") {
            let notes = localStorage.getItem('notes');
            notesObj = JSON.parse(notes);
            notesObj[parseInt(addBtn.getAttribute("name"))] = addTxt.value;
            localStorage.setItem("notes", JSON.stringify(notesObj));
            addTxt.value = "";
            addBtn.innerText = "Add Note"
            showNotes();
            displayMessage("Note updated successfully")
      }


})

function displayMessage(msg) {
      let message = document.querySelector('.message')
      message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
    </div>`

      setTimeout(() => {
            message.innerHTML = ''
      }, 3000)
}


//function to show a note
function showNotes() {
      let notes = localStorage.getItem('notes');

      if (notes == null) {
            notesObj = [];
      } else {
            notesObj = JSON.parse(notes);
      }

      let html = "";
      notesObj.forEach(function (element, index) {
            html += `<div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            <button id="${index}" onclick="updateNote(this.id)" class="btn btn-primary">Update Note</button>
        </div>
    </div>`;
      });

      let notesEle = document.getElementById('notes');

      if (notesObj.length != 0) {
            notesEle.innerHTML = html;
      } else {
            notesEle.innerHTML = `Nothing to show! Use "Add a Notes" section above to add notes`;
      }

}

//function to delete a note
function deleteNote(index) {
      let notes = localStorage.getItem('notes');

      if (notes == null) {
            notesObj = [];
      } else {
            notesObj = JSON.parse(notes);
      }

      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();

}
//function to delete a note
function updateNote(index) {
      let notes = localStorage.getItem('notes');


      notesObj = JSON.parse(notes);

      addTxt.value = notesObj[index];
      addBtn.innerText = "Update Note";
      addBtn.setAttribute("name", index.toString())

}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input", function () {

      let inputVal = searchTxt.value.toLowerCase();

      let noteCard = document.getElementsByClassName('noteCard');
      Array.from(noteCard).forEach(function (element) {

            let cardTxt = element.getElementsByTagName("p")[0].innerText;

            if (cardTxt.includes(inputVal)) {
                  element.style.display = "block";
            } else {
                  element.style.display = "none";
            }
      })
})

