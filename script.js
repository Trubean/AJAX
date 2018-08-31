window.onload = function () {
var pageCounter = 1;
var button = document.getElementById("btn");
button.addEventListener("click", function () {
var ourRequest = new XMLHttpRequest();
  ourRequest.onLoad = function () {
  // this doesn't execute in Chrome so I used onreadystatechange instead. However, that stops working if this is removed
	  console.log('done loading');
  };
  ourRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Action to be performed when the document is read;
		  console.log('ready state good');
  		  var ourData = JSON.parse(ourRequest.responseText);
		  renderHTML(ourData);
	     } else {
			 console.log('readyState=' + this.readyState + ' status=' +this.status);
		 }
  };
  ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
  ourRequest.onerror = function () {
	  console.log('connection error');
  }
  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3) {
	//  button.classlist.add("hide-me");    script.js:23 Uncaught TypeError: Cannot read property 'add' of undefined
    //	at HTMLButtonElement.<anonymous>.... maybe its read only?
	$('#btn').addClass("hide-me");
  }
});
//end of window.onload
};
function renderHTML(data) {
	var animalContainer = document.getElementById("animal-info");
	htmlString = "";
	for (i = 0; i < data.length; i++) {
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
		for (ii = 0; ii < data[i].foods.likes.length; ii++) {
		if (ii == 0) {
			htmlString += data[i].foods.likes[ii];
		} else {
				htmlString += ' and likes ' + data[i].foods.likes[ii];
				}
		}
		htmlString += ' and dislikes ';
		for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
		if (ii == 0) {
			htmlString += data[i].foods.dislikes[ii];
		} else {
				htmlString += ' and dislikes ' + data[i].foods.dislikes[ii];
				}
		}
		
	htmlString += ',</p>';
	}
	animalContainer.insertAdjacentHTML('beforeend',htmlString);
	
}