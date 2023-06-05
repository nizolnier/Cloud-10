<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	header('Access-Control-Allow-Origin: http://cop4331group10.xyz');
	header('Access-Control-Allow-Origin: http://cop4331group10.xyz/LAMPAPI/SearchUsers.php');
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
		$stmt = $conn->prepare("SELECT * FROM Users WHERE Login= ?");
		$stmt->bind_param("s", $inData["username"]);
		$stmt->execute();

		$result = $stmt->get_result();

		while($row = $result->fetch_assoc())
		{
			$searchCount++;
		}

		if( $searchCount == 0 )
		{
			returnWithInfo( "" );
		}
		else
		{
			returnWithError( "Username has been taken" );
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"Error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $info )
	{
		$retValue = '{"Error": "' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>