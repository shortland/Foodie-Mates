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

    public function getUser($user_id) {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                user_id,
                first_name,
                last_name,
                email,
                phone_number,
                address,
                account_type,
                requires_onboard
            FROM 
                users
            WHERE
                user_id = ?;
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        $user = $result->fetch_object();
        $this->db->disconnect();

        return $user;
    }

    public function updateUser($user_id, $data) {
        // Ensure the database is connected
        $this->db->connect();

        // Prepare the SET part of the SQL statement
        $set_query_part = '';
        foreach ($data as $key => $value) {
            // Consider adding validation to check if $key is a valid column name
            if ($set_query_part != '') {
                $set_query_part .= ', ';
            }
            $set_query_part .= $key . ' = ?';
        }

        // Build the query
        $query = <<<SQL
            UPDATE
                users
            SET
                $set_query_part
            WHERE
                user_id = ?;
        SQL;

        $result = $this->db->doRawQuery($query, [...array_values($data), $user_id], false);

        $this->db->disconnect();

        return $result;
    }

    public function getAccountType($user_id) {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                account_type
            FROM 
                users
            WHERE
                user_id = ?;
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        $account_type = $result->fetch_object();
        $this->db->disconnect();

        return $account_type;
    }
}