<?php

class AuthController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/auth/profile' => "profile",
            ],
            'POST' => [
                '/auth/login' => "login",
                '/auth/register' => "register"
            ],
            'DELETE' => [
                '/auth/logout' => 'logout'
            ]
        ];
    }

    function profile($args, $data, $cookies) {
        $cookie_path = SESS_COOKIES_PATH . "/sess_" . $cookies[SESS_ID];

        if (!file_exists($cookie_path)) {
            # current cookie user provided is not valid (anymore?)
            return new ErrorRes('not logged in');
        }

        $sess_data = json_decode(file_get_contents($cookie_path), true);
        $user_id = $sess_data['user_id'];
        
        $user = new UsersQueries();

        return $user->getUser($user_id);
    }

    function login($args, $data, $cookies) {

        // TODO: these are expected to be here, need to validate that
        $username = $data['username'];
        $password = $data['password'];

        $auth = new AuthQueries();

        try {
            $user_id = $auth->validateLogin($username, $password);
        } catch (Exception $e) {
            return new ErrorRes($e->getMessage());
        }

        // generate a session id
        $sess_id = bin2hex(random_bytes(16));

        $cookie_path = SESS_COOKIES_PATH . "/sess_" . $sess_id;

        // save the session id to a file
        file_put_contents($cookie_path, json_encode(['user_id' => $user_id]));

        return ['SESSION_ID' => $sess_id, 'user_id' => $user_id];
    }

    function register($args, $data, $cookies) {
        // implement register function based on login
        $email = $data['email_address'];
        $phone_number = $data['phone_number'];
        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $password = $data['password'];

        $auth = new AuthQueries();

        try {
            $user_id = $auth->createUser($email, $phone_number, $first_name, $last_name, $password);
        } catch (Exception $e) {
            return new ErrorRes($e->getMessage());
        }

        return ['success' => $user_id];
    }

    function logout($args, $data, $cookies) {
        return 'logout';
    }
}
