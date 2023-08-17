var apiKey = "AIzaSyBVe3t75GHMwNyhJyj-rCCGMYGddqhDlZs"
var userInput;
var bookDesc = [];
var bookTitle = [];
let currentPage = 1;

var memoryArr =  JSON.parse(localStorage.getItem('key')) || []

function toggleClass(e, toggleClassName) {
  if(e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  if (page == currentPage) {
    currentPage+=2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");
    
  }
  else if (page = currentPage - 1) {
    currentPage-=2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
  
}

function sendtoSignUp () {
  window.location.replace('/signup') 
};

function sendtoLogin () {
  window.location.replace('/login') 
};

function sendtoHome () {
  window.location.replace('/') 
}

var search = function(){

    var userInput = document.querySelector(".searchbar").value;
    var queryURL = ` https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=${apiKey}`

    fetch(queryURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for (var i = data.items.length - 1; i >= 0; i--) {
            console.log(bookDesc);
            console.log(bookTitle);
            bookDesc.push(data.items[i].volumeInfo.description);
            bookTitle.push(data.items[i].volumeInfo.title);
          }
          toLocal(bookDesc, bookTitle)
          window.location.replace('/results') 
    })
}

function toLocal (bookDesc, bookTitle) {
  var bookKey = bookTitle
  var bookVal = bookDesc

  for (var i = bookKey.length - 1; i >= 0; i--){
    for (var x = bookVal.length - 1; i >= 0; i--){
  var store = {
    key: bookKey[i],
    val: bookVal[x]
  }
    }
  }
memoryArr.push(store);

localStorage.setItem('key', JSON.stringify(memoryArr));
}

