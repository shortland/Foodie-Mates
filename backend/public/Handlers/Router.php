<?php

require 'Controllers/Controller.php';
require 'Controllers/HomeController.php';
require 'Controllers/UsersController.php';

require 'Models/HttpResponse.php';

require 'Db/Db.php';
require 'Db/Queries/UsersQueries.php';

class Router {
    public static function resolvePath() {
        if (isset($_SERVER['PATH_INFO'])) {
            return $_SERVER['PATH_INFO'];
        } else {
            return '/';
        }
    }

    public static function resolveQueryString() {
        if (isset($_SERVER['QUERY_STRING'])) {
            $query_string = '';
            parse_str($_SERVER['QUERY_STRING'], $query_string);
            return $query_string;
        } else {
            return [];
        }
    }

    public static function route() {
        $endpoint = static::resolvePath();
        $query_string = static::resolveQueryString();
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($endpoint) {
            case '/':
                (new HomeController())->route($method, $endpoint, $query_string);
                break;
            case '/users':
                (new UsersController())->route($method, $endpoint, $query_string);
                break;
            case '/restaurants':
                echo 'restaurants';
                break;
            default:
                echo '"' . $endpoint . '" not found';
        }
    }
}
