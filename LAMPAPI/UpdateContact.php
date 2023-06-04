<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);


    # Doesn't work (when testing locally at least) for some reason.

    $inData = getRequestInfo();

	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$newFirst = $inData["newFirstName"];
	$newLast = $inData["newLastName"];
	$id = $inData["contactID"];

	# This is best for local curls
    # $phoneNumber = $_POST['phoneNumber'];
	# $emailAddress = $_POST['emailAddress'];
	# $newFirst = $_POST['newFirstName'];
	# newLast = $_POST['newLastName'];
    # $id = $_POST['id'];

	header('Access-Control-Allow-Origin: *');
	header("Content-Type: application/json");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization');

    # You can change this for your local DB if needed.
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
		if ($conn->connect_error)
		{
			returnWithError( $conn->connect_error );
		}
		else
		{
			$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName=?, Phone= ?, Email= ? WHERE ID= ?");
			$stmt->bind_param("ssssi", $newFirst, $newLast, $phoneNumber, $emailAddress, $id);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			http_response_code(200);
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
    if ($err !== "") {
        http_response_code(500);
    }
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}


?>