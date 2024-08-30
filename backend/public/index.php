<?php

include 'Constants/Misc.php';
include 'Config/Config.php';


include 'Components/Header.php';
// include 'Components/Parameters.php';

include 'Handlers/Router.php';

$header = new Header('text', true);
// $params = new Parameters();

Router::route();
