<?php
    // Send an SMS using Twilio
    require_once "twilio/autoload.php";
    use Twilio\Rest\Client;
    
    $AccountSid = "ACd11e97442b5ac5f299dc8072ded484aa";
    $AuthToken = "03304b5dccdff25332b33c86394056f1";

    $client = new Client($AccountSid, $AuthToken);

    $people = array(
        "+14066005497" => "Testing testing"
    );

    foreach ($people as $number => $name) {

        $sms = $client->account->messages->create(

            // the number we are sending to - Any phone number
            $number,

            array(
                'from' => "+14065301801", 
                
                // the sms body
                'body' => "Money is on your way"
            )
        );
        echo "Sent message to $name";
    }