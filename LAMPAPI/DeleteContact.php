<?php

	
	$inData = getRequestInfo();

    $userID = $inData["UserID"];
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];

	# $userId = $_POST['UserID'];
	# $firstName = $_POST['firstName'];
	# $lastName = $_POST['lastName'];
	

	header('Access-Control-Allow-Origin: *');
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization');

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName=? AND LastName=? AND UserID=?");
		$stmt->bind_param("ssi", $firstName, $lastName, $userID);
		$stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
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

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


?>