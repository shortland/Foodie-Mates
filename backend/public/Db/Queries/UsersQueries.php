<?php

class UsersQueries {
    private $db;

    public function __construct($config_key = "database") {
        $this->db = new Db(
            CONFIG[$config_key]['username'],
            CONFIG[$config_key]['password'],
            CONFIG[$config_key]['host'],
            CONFIG[$config_key]['database']
        );
    }

    public function getUsers() {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                user_id,
                first_name,
                last_name,
                email,
                phone_number,
                address 
            FROM 
                users;
        SQL;
        $result = $this->db->doRawQuery($query, []);

        $users = [];
        if ($result->num_rows > 0) {
            // Fetch each object and store it in the array
            while ($obj = $result->fetch_object()) {
                $users[] = $obj;
            }
        }
        $this->db->disconnect();

        return $users;
    }

    public function getUser($id) {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                user_id,
                first_name,
                last_name,
                email,
                phone_number,
                address 
            FROM 
                users
            WHERE
                user_id = ?;
        SQL;
        $result = $this->db->doRawQuery($query, [$id]);

        $user = $result->fetch_object();
        $this->db->disconnect();

        return $user;
    }
}