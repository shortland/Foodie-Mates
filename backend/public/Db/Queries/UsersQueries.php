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

       $query = "SELECT user_id, first_name, last_name, email, phone_number, address FROM users";

       $result = $this->db->doRawQuery($query, [], true);

       $this->db->disconnect();

       return $result;
    }
}