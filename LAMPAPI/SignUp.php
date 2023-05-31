<?php

	$inData = getRequestInfo();

	$firstName = $inData['firstName']
	$lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

	$conn = new mysqli("localhost", "root", "group@10Slay", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connection_error );
	}
	else
	{
		$sql = "SELECT FROM Users WHERE Login=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();
		$rows = mysqli_num_rows($result);
		if($rows == 0) {
			$stmt = $conn->prepare("INSERT into USERS (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
			$stmt->execute();
			$id = $conn->insert_id;
			$stmt->close();
			$conn->close();
			http_response_code(200);
			$searchResults .= '{'.'"id": "'.$id.''.'"}';
			returnWithInfo(searchResults);
		}else {
			http_response_code(409);
			returnWithError("Username taken")
		}

	}

    function getRequestInfo() 
    {
		return json_decode(file_get_contents('php://input'), true);
    }

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo( $searchResults ) {
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue )
	}

	function returnWithError( $err )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>