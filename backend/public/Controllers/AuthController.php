<?php

class AuthController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/auth/profile' => [
                    'function' => 'profile',
                    'auth' => true
                ]
            ],
            'POST' => [
                '/auth/login' => [
                    'function' => 'login',
                    'data' => [
                        'username',
                        'password'
                    ]
                ],
                '/auth/register' => [
                    'function' => 'register',
                    'data' => [
                        'email_address',
                        'phone_number',
                        'first_name',
                        'last_name',
                        'password'
                    ]
                ]
            ],
            'DELETE' => [
                '/auth/logout' => [
                    'function' => 'logout',
                    'auth' => true
                ]
            ]
        ];
    }

    function profile($args, $data, $cookies) {
        $cookie_path = SESS_COOKIES_PATH . "/sess_" . $cookies['SESSION_ID'];
        $sess_data = json_decode(file_get_contents($cookie_path), true);
        $user_id = $sess_data['user_id'];
        
        $user = new UsersQueries();

        return $user->getUser($user_id);
    }

    function login($args, $data, $cookies) {
        $username = $data['username'];
        $password = $data['password'];

        $auth = new AuthQueries();

        try {
            $user_id = $auth->validateLogin($username, $password);
        } catch (Exception $e) {
            return new ErrorRes($e->getMessage());
        }

        // TODO: maybe remove this, kinda prevents people from being logged into same account on multiple devices
        // invalidate the old session id
        // this is not super scalable
        $all_cookies = scandir(SESS_COOKIES_PATH);
        foreach ($all_cookies as $cookie) {
            if ($cookie != '.' && $cookie != '..') {
                $contents = json_decode(file_get_contents(SESS_COOKIES_PATH . '/' . $cookie))->user_id;
                if ($contents == $user_id) {
                    unlink(SESS_COOKIES_PATH . '/' . $cookie);
                }
            }
        }

        // create new cookie
        $sess_id = bin2hex(random_bytes(16));
        $cookie_path = SESS_COOKIES_PATH . "/sess_" . $sess_id;
        file_put_contents($cookie_path, json_encode(['user_id' => $user_id]));

        return ['SESSION_ID' => $sess_id, 'user_id' => $user_id];
    }

    function register($args, $data, $cookies) {
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
