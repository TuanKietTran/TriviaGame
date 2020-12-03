function myFunction() {
    var x = document.getElementById("menuBar");
    if (x.className === "menuBar") {
        x.className += " responsive";
    } else {
        x.className = "menuBar";
    }
}

function rollDown() {
  	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  	if (!event.target.matches('.dropButton')) {
    	var dropdowns = document.getElementsByClassName("dropdownContent");
    	var i;
    	for (i = 0; i < dropdowns.length; i++) {
      		var openDropdown = dropdowns[i];
      		if (openDropdown.classList.contains('show')) {
        	openDropdown.classList.remove('show');
      		}
    	}
  	}
}