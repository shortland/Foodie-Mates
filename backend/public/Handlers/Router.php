<?php

require 'Controllers/Controller.php';
require 'Controllers/HomeController.php';
require 'Controllers/UsersController.php';
require 'Controllers/AuthController.php';
require 'Controllers/UserAuctionsController.php';
require 'Controllers/RestaurantAuctionsController.php';

require 'Models/HttpResponse.php';

require 'Db/Db.php';
require 'Db/Queries/UsersQueries.php';
require 'Db/Queries/AuthQueries.php';
require 'Db/Queries/AuctionsQueries.php';


class Router {
    public static function resolvePath() {
        if (isset($_SERVER['PATH_INFO'])) {
            // remove trailing '/' if there is one
            return rtrim($_SERVER['PATH_INFO'], '/');
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

    public static function resolveBinData() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            return [];
        } else {
            $bin_data = '';
            parse_str(file_get_contents('php://input'), $bin_data);
            return $bin_data;
        }
    }

    public static function route() {
        $full_endpoint = static::resolvePath();
        $parts_endport = explode('/', $full_endpoint);

        $query_string = static::resolveQueryString();

        $bin_data = static::resolveBinData();

        $cookies = $_COOKIE;

        $method = $_SERVER['REQUEST_METHOD'];

        switch ($parts_endport[1]) {
            case '':
                (new HomeController())->route($method, $full_endpoint, $query_string, $bin_data, $cookies);
                break;
            case 'users':
                (new UsersController())->route($method, $full_endpoint, $query_string, $bin_data, $cookies);
                break;
            case 'auth':
                (new AuthController())->route($method, $full_endpoint, $query_string, $bin_data, $cookies);
                break;
            case 'auctions':
                switch ($parts_endport[2]) {
                    case 'user':
                        (new UserAuctionsController())->route($method, $full_endpoint, $query_string, $bin_data, $cookies);
                        break;
                    case 'restaurant':
                        (new RestaurantAuctionsController())->route($method, $full_endpoint, $query_string, $bin_data, $cookies);
                        break;
                    default:
                        echo '"' . $full_endpoint . '" not found';
                }
                break;
            default:
                echo '"' . $full_endpoint . '" not found';
        }
    }
}
