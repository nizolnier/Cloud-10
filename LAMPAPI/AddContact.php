<?php
	$inData = getRequestInfo();
	
	# $firstName = $inData["firstName"];
	# $lastName = $inData["lastName"];
	# $phoneNumber = $inData["phoneNumber"];
	# $emailAddress = $inData["emailAddress"];
	# $userId = $inData["userId"];


	$phoneNumber = $_POST['phoneNumber'];
	$emailAddress = $_POST['emailAddress'];
	$newFirst = $_POST['newFirstName'];
	$newLast = $_POST['newLastName'];
    $id = $_POST['id'];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, PhoneNumber, EmailAddress, UserId) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssssi", $firstName, $lastName, $phoneNumber, $emailAddress, $userID);
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