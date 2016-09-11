<?php
    // Send an SMS using Twilio
    $name_f=$_GET["name"];
    $email_f=$_GET["email"];
    $phone_f=$_GET["phone"];
    $message_f=$_GET["message"];       
    require_once "twilio/autoload.php";
    use Twilio\Rest\Client;
    
    $AccountSid = "ACd11e97442b5ac5f299dc8072ded484aa";
    $AuthToken = "03304b5dccdff25332b33c86394056f1";

    $client = new Client($AccountSid, $AuthToken);

    $people = array(
        "+14066005497" => $phone_f;
    );

    foreach ($people as $number => $name) {

        $sms = $client->account->messages->create(

            // the number we are sending to - Any phone number
            $number,

            array(
                'from' => "+14065301801", 
                
                // the sms body
                'body' => "Message from: " + $email_f + ". Message: " + $message_f,
            )
        );
        echo "Thanks for contacting LocalSecretClub, we will get back to you, ".$name." as soon as possible";
    }