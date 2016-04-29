<?php
//echo extension_loaded("mongo") ? "loaded\n" : "not loaded\n";
//print_r(get_loaded_extensions());
$m = new MongoClient();
    
   echo "Connection to database successfully";
   $db = $m->kitten_rater;
   echo "Database kitten_rater selected";
   $collection = $db->Kissat;
   echo "Collection selected succsessfully";
   $cursor = $collection->find();

		if($cursor->hasNext())
		{
    		echo json_encode(iterator_to_array($cursor));
    		
		}	
	
   
/*   
$i = 1;
if ($handle = opendir('../Cats')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            echo $i;
            echo "<br>";
            $document = array("ID" => $i);
            $collection->insert($document);
            echo "Document inserted successfully";
            $i++;
        }
    }
    closedir($handle);
}*/
$m->close();

?>