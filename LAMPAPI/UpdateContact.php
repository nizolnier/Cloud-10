<?php

	

    # Doesn't work (when testing locally at least) for some reason.

    # $inData = getRequestInfo();

	# $phoneNumber = $inData["phoneNumber"];
	# $emailAddress = $inData["emailAddress"];
	# $newFirst = $inData["newFirstName"];
	# $newLast = $inData["newLastName"];
	# $id = $inData["id"];

    $phoneNumber = $_POST['phoneNumber'];
	$emailAddress = $_POST['emailAddress'];
	$newFirst = $_POST['newFirstName'];
	$newLast = $_POST['newLastName'];
    $id = $_POST['id'];


    # You can change this for your local DB if needed.
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
		if ($conn->connect_error)
		{
			returnWithError( $conn->connect_error );
		}
		else
		{
			$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName=?, PhoneNumber= ?, EmailAddress= ? WHERE ID= ?");
			$stmt->bind_param("ssssi", $newFirst, $newLast, $phoneNumber, $emailAddress, $id);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


?>