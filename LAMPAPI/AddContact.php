<?php
	$inData = getRequestInfo();
	
	$contactFirstName = $inData["contactFirstName"];
	$contactLastName = $inData["contactLastName"];
	$contactPhone = $inData["contactPhone"];
	$contactEmail = $inData["contactEmail"];
	$userID = $inData["userID"];



	header('Access-Control-Allow-Origin: http://cop4331group10.xyz');
	header('Access-Control-Allow-Origin: http://cop4331group10.xyz/LAMPAPI/AddContact.php');
	header('Access-Control-Allow-Origin: *');
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization');

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Phone, Email, UserID, FirstName, LastName) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssiss", $contactPhone, $contactEmail, $userID, $contactFirstName, $contactLastName);
		$id = $conn->insert_id;
		$stmt->execute();
		$stmt->close();
		$conn->close();
		http_response_code(200);
		$searchResults[] = array('id' => $id, 'firstName' => $firstName, 'lastName' => $lastName);
		sendResultInfoAsJson($searchResults);
		// echo ("Succesful");
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