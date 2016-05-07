<?php


function createDB(){
    $m = new MongoClient();
   $db = $m->kitten_rater;
   $collection = $db->Kissat;
   return $collection;
}
		       
# URI parser helper functions
# ---------------------------

    function getResource() {
        # returns numerically indexed array of URI parts
        $resource_string = $_SERVER['REQUEST_URI'];
        if (strstr($resource_string, '?')) {
            $resource_string = substr($resource_string, 0, strpos($resource_string, '?'));
        }
        $resource = array();
        $resource = explode('/', $resource_string);
        array_shift($resource);   
        return $resource;
    }

    function getParameters() {
        # returns an associative array containing the parameters
        $resource = $_SERVER['REQUEST_URI'];
        $param_string = "";
        $param_array = array();
        if (strstr($resource, '?')) {
            # URI has parameters
            $param_string = substr($resource, strpos($resource, '?')+1);
            $parameters = explode('&', $param_string);                      
            foreach ($parameters as $single_parameter) {
                $param_name = substr($single_parameter, 0, strpos($single_parameter, '='));
                $param_value = substr($single_parameter, strpos($single_parameter, '=')+1);
                $param_array[$param_name] = $param_value;
            }
        }
        return $param_array;
    }

    function getMethod() {
        # returns a string containing the HTTP method
        $method = $_SERVER['REQUEST_METHOD'];
        return $method;
    }
 
# Handlers
# ------------------------------
# These are mock implementations

	function postComment() {
		# implements POST method for comment
		# Example: POST /kitten_rater/cat/comment/?id=13&comment=lol
		$cat_id = (int) $_POST["id"];
		$string =$_POST["comment"];
		$string2 =$_POST["nick"];
		$comment = (string) strip_tags($string);
		$nick = (string) strip_tags($string2);
		//$comment=mysql_real_escape_string($comment);
		
		
		$collection = createDB();
		$newcomment = array('$push' => array('comments' => array('nick'=> $nick, 'comment' => $comment)));
		$collection->update(array("ID" => $cat_id), $newcomment);
		
		
		
		
	}
	
	function postName() {
		# implements POST method for comment
		# Example: POST /kitten_rater/cat/name/?id=13&name=Teppo
		$cat_id = (int) $_POST["id"];
		
		
		//$comment=mysql_real_escape_string($comment);
		
		
		$collection = createDB();
		$newname = array('$push' => array('name' => $name));
		$collection->update(array("ID" => $cat_id), $newname);
		
		
		
		
	}
	
	
	function postStar() {
		# implements POST method for stars
		# Example: POST /kitten_rater/cat/star/?id=13&star=3
		
		$cat_id = (int) $_POST["id"];
		$star = (int) $_POST["star"];
		$collection = createDB();
		
		$newstar = array('$inc' => array('stars' => $star));
		$collection->update(array("ID" => $cat_id), $newstar);
		
		$newrating = array('$inc' => array('rates' => 1));
		$collection->update(array("ID" => $cat_id), $newrating);
	

	}
	/*function getCats() {
		# implements GET method for persons (collection)
		# Example: GET /staffapi/persons
		echo "Getting list of persons";
	}*/
	
	function getCat() {
	    # implements GET method for cat
		# Example: GET /kitten_rater/cat/?id=13
		$cat_id = (int) $_GET["id"];
	    //$cat_id = (int) urldecode($parameters["id"]);

		$collection = createDB();
		$cat = $collection->findOne(array('ID' => $cat_id),array("_id"=>0));
		echo json_encode($cat);
	}

	function getNewCat() {
		# implements GET method for cat
		# Example: GET /kitten_rater/newcat/
		//if (!empty($_GET['action'])){
		$collection = createDB();
		$cursor = $collection->find()->sort(array("ID"=>-1));
        $last = array_values(array_values(iterator_to_array($cursor))[0])[1];
        $cat_id = rand(1,$last);
       // echo $cat_id;
        $cat = $collection->findOne(array('ID' => $cat_id),array("_id"=>0));
        //print_r($cat);
        echo json_encode($cat);
		       
	//	}
		    
		    
		/*    $url =  "https://kitten-rater-vilperi.c9users.io/php/" .
        urlencode($_GET['Cat']).;
   
  $hkijson = file_get_contents($hki_url);
		echo "Getting person: ".$id;*/
	}

	function deleteCat($id) {
		# implements DELETE method for cat
		# Example: DELETE /kitten_rater/cat/13
		$collection = createDB();
		  $collection->remove(array("ID"=>$id),false);

	}

# Main
# ----

	$resource = getResource();
    $request_method = getMethod();
    //$parameters = getParameters();

    # Redirect to appropriate handlers.
	if ($resource[0]=="kitten_rater") {
    	if ($request_method=="POST" && $resource[1]=="cat" && $resource[2]=="comment") {
        	postComment();
    	}else if ($request_method=="POST" && $resource[1]=="cat" && $resource[2]=="star") {
        	postStar();
    	}
    	else if ($request_method=="POST" && $resource[1]=="cat" && $resource[2]=="img") {
        	postImg();
    	}
    	else if ($request_method=="POST" && $resource[1]=="cat" && $resource[2]=="name") {
        	postName();
    	}
    	else if ($request_method=="GET" && $resource[1]=="cat") {
    	    getCat();
    	}
		else if ($request_method=="GET" && $resource[1]=="newcat") {
			getNewCat();
		}
		/*else if ($request_method=="DELETE" && $resource[1]=="cat") {
			deleteCat($resource[2]);
		}*/
		else {
			http_response_code(405); # Method not allowed
		}
	}
	else {
		http_response_code(405); # Method not allowed
	}
	/*$connections = $m->getConnections();
	foreach ( $connections as $con )
{
    // Loop over all the connections, and when the type is "SECONDARY"
    // we close the connection
    
        echo "Closing '{$con['hash']}': ";
        $closed = $m->close( $con['hash'] );
        echo $closed ? "ok" : "failed", "\n";
    
}*/
?>

