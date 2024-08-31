<?php

class UsersController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/users/profile' => [
                    'description' => 'for an account to get info their own profile',
                    'function' => 'getProfile',
                    'auth' => true
                ],
                '/users' => [
                    'description' => 'NOTE: working; but dev-only endpoint; remove in prod',
                    'function' => 'getUsers',
                    'auth' => true
                ],
                '/users/user' => [
                    'description' => 'NOTE: working; but dev-only endpoint; remove in prod',
                    'function' => 'getUser',
                    'auth' => true,
                    'query' => ['id']
                ],
                '/users/type' => [
                    'description' => 'to get info on whether current account is a person or restaurant',
                    'function' => 'accountType',
                    'auth' => true
                ]
            ],
            'PUT' => [
                '/users/profile' => [
                    'description' => 'allow account to update their profile, provide field in data to update; must match db column name in users table',
                    'function' => 'updateProfile',
                    'auth' => true,
                    'data' => [] // NOTE: if empty, wont do anything, if given 'email' then will update that
                ]
            ]
        ];
    }

    function getProfile($args, $data, $cookies) {
        $user = new UsersQueries();

        return $user->getUser($this->user_id);
    }

    function updateProfile($args, $data, $cookies) {
        $user = new UsersQueries();

        if (count($data) == 0) {
            return new ErrorRes('No data provided to update');
        }

        return !$user->updateUser($this->user_id, $data);
    }

    function getUsers($args, $data, $cookies) {
        $users = new UsersQueries();

        return $users->getUsers();
    }

    function getUser($args, $data, $cookies) {
        $users = new UsersQueries();

        return $users->getUser($args['id']);
    }

    function accountType($args, $data, $cookies) {
        $users = new UsersQueries();

        return $users->getAccountType($this->user_id);
    }
}
