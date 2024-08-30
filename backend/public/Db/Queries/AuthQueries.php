<?php

class AuthQueries {
    private $db;

    public function __construct($config_key = "database") {
        $this->db = new Db(
            CONFIG[$config_key]['username'],
            CONFIG[$config_key]['password'],
            CONFIG[$config_key]['host'],
            CONFIG[$config_key]['database']
        );
    }

    public function validateLogin($username, $password) {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                user_id,
                email,
                phone_number,
                password_hash,
                password_salt
            FROM 
                users
            WHERE
                email = ?
            OR
                phone_number = ?;
        SQL;
        $result = $this->db->doRawQuery($query, [$username, $username]);

        $user = $result->fetch_object();

        $this->db->disconnect();

        if ($user == null) {
            throw new Exception("User not found");
        }

        $hash = hash('sha256', $password . $user->password_salt);
        if ($hash != $user->password_hash) {
            throw new Exception("Invalid password");
        }

        return $user->user_id;
    }

    public function createUser($email, $phone_number, $first_name, $last_name, $password, $account_type) {
        $this->db->connect();
        $salt = bin2hex(random_bytes(32));
        $hash = hash('sha256', $password . $salt);
        $query = <<<SQL
            INSERT INTO
                users (email, phone_number, first_name, last_name, password_hash, password_salt, account_type)
            VALUES
                (?, ?, ?, ?, ?, ?, ?);
        SQL;
        $result = $this->db->doRawQuery($query, [
            $email,
            $phone_number,
            $first_name,
            $last_name,
            $hash,
            $salt,
            $account_type
        ]);

        $this->db->disconnect();

        return $result;
    }
}
