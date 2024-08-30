<?php

class UsersController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/users' => [
                    // todo: this is a dev-only endpoint, remove in prod
                    'function' => 'getUsers',
                    'auth' => true
                ],
                '/users/user' => [
                    // todo: this is a dev-only endpoint, remove in prod
                    'function' => 'getUser',
                    'auth' => true,
                    'query' => ['id']
                ],
                '/users/type' => [
                    'function' => 'accountType',
                    'auth' => true
                ]
            ],
            'PUT' => [
                '/users/profile' => [
                    // todo
                    'function' => 'updateProfile',
                    'auth' => true,
                    'data' => [
                        'first_name',
                        'last_name',
                        'email',
                        'phone_number',
                        'address',
                        'password',
                        'payment_credit_card'
                    ]
                ]
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

    function accountType() {
        $users = new UsersQueries();
        return $users->getAccountType($this->user_id);
    }
}
