<?php

class UsersController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/users' => "getUsers",
                '/user' => "getUser"
            ],
            'POST' => [
                '/users/' => 'create'
            ],
            'PUT' => [
                '/users/' => 'update'
            ],
            'DELETE' => [
                '/users/' => 'delete'
            ]
        ];
    }

    function getUsers() {
        $users = new UsersQueries();
        return $users->getUsers();
        // return 'users index';
    }

    function getUser() {
        return 'users show' . $id;
    }
}
