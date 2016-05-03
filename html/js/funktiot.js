window.onload = lataus;


	function lataus(){
    document.getElementById('everything').style.display = 'none';
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
	
	
	
	
	ajaxFunction("newcat");

}

function ajaxFunction(str){
	var ajaxRequest;  // The variable that makes Ajax possible!
	var url = "https://kitten-rater-vilperi.c9users.io/kitten_rater/" + str;
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	//  function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			
			alert(ajaxRequest.status);
			
			
			if (ajaxRequest.status === 200) {
			alert(ajaxRequest.responseText);
          		
        	} else {
        		
          		alert(ajaxRequest.status);
        }	
      }
	}
	ajaxRequest.open("GET", url, true);
	ajaxRequest.send(); 
}


    document.querySelector('nav > ul > li:nth-child(1)').onclick = function() {
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
};

    document.querySelector('nav > ul > li:nth-child(2)').onclick = function() {
	document.getElementById('commentfield').style.display = 'none';
	document.getElementById('ratingfield').style.display = '';
};

    document.querySelector('input-1').onclick = function(){
    document.getElementById('everything').style.display = '';  
};

function arvostele(a){
    document.getElementById('everything').style.display = '';
    // tähän jotain joka käyttää a parametriä ratingin lähetykseen
}


function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }

  previewFile();  //calls the function named previewFile()


function submitFile(){
	previewFile().file
}