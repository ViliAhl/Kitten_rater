window.onload = lataus;
var cat;

	function lataus(){
    document.getElementById('everything').style.display = 'none';
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
	
	document.getElementById("star-5").addEventListener("click", function() {arvostele("5");});
	document.getElementById("star-4").addEventListener("click", function() {arvostele("4");});
	document.getElementById("star-3").addEventListener("click", function() {arvostele("3");});
	document.getElementById("star-2").addEventListener("click", function() {arvostele("2");});
	document.getElementById("star-1").addEventListener("click", function() {arvostele("1");});
	
	
	
	ajaxFunction("newcat", "GET");
	

}

//EEBENPUU
var element = document.getElementById("catimage");
var mc = Hammer(element).on("panleft", function() {
    location.reload();
}); 

function ajaxFunction(str, method){
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
			
			
			
			
			if (ajaxRequest.status === 200) {
				cat = JSON.parse(ajaxRequest.responseText);
				if (str == "newcat"){
					//users.metropolia is BECAUSE THIS FUCKING CLOUD9 CAN'T DOWNLOAD ALL MY CAT PICS FROM LOCALFILES
					document.getElementById('catimage').src = ("http://users.metropolia.fi/~eetukah/Cats/" + cat.ID + ".jpg");
				}
				
		
          		
        	} else {
        		
          		alert(ajaxRequest.status);
          		
        }	
      }
	}
	ajaxRequest.open(method, url, true);
	ajaxRequest.send(); 
}


    document.querySelector('nav > ul > li:nth-child(1)').onclick = function() {
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
};

    document.querySelector('nav > ul > li:nth-child(2)').onclick = function() {
	document.getElementById('commentfield').style.display = 'none';
	document.getElementById('ratingfield').style.display = '';
    document.getElementById('ratingfield').innerHTML = cat.stars + " " + cat.rates;
    
};
	//Mikä tää on?
    document.querySelector('input-1').onclick = function(){
    document.getElementById('everything').style.display = '';  
};

	


function arvostele(a){
	 document.getElementById('everything').style.display = '';
    // tähän jotain joka käyttää a parametriä ratingin lähetykseen
    //siinäpä ois:
    ajaxFunction("cat/star/?id="+ cat.ID +"&star="+a,"POST");
    ajaxFunction("cat/?id="+cat.ID, "GET");
    
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