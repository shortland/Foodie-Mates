<?php

class UsersController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/users' => "getUsers",
                '/users/user' => "getUser"
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
    }

    function getUser($args) {
        // todo: eventually move this validation to __construct() and Controller() to validate args
        if (!isset($args['id'])) {
            return 'id not found & required';
        }

        $users = new UsersQueries();
        return $users->getUser($args['id']);
    }
}
