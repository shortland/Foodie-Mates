<?php

class AuctionsQueries {
    private $db;

    public function __construct($config_key = "database") {
        $this->db = new Db(
            CONFIG[$config_key]['username'],
            CONFIG[$config_key]['password'],
            CONFIG[$config_key]['host'],
            CONFIG[$config_key]['database']
        );
    }

    // todo: temp
    public function getUserAuctions($user_id): array {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                *
            FROM 
                user_requests
            WHERE
                user_id = ?
            ORDER BY
                is_live DESC;
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        $auctions = [];
        if ($result->num_rows > 0) {
            while ($obj = $result->fetch_object()) {
                $auctions[] = $obj;
            }
        }

        return $auctions;
    }

    public function userHasLiveAuction($user_id): bool {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                *
            FROM 
                user_requests
            WHERE
                user_id = ?
            AND
                is_live = 1;
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        $has_auction = $result->fetch_object();

        return $has_auction ? true : false;
    }

    public function createAuction($user_id, $data) {
        $this->db->connect();
        $query = <<<SQL
            INSERT INTO
                user_requests (
                    user_id,
                    preferred_cuisine_type,
                    num_people,
                    distance_miles,
                    longitude,
                    latitude,
                    total_budget,
                    num_appetizer,
                    num_main_course,
                    num_dessert,
                    num_drink,
                    is_live
                )
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);
        SQL;
        $result = $this->db->doRawQuery($query, [
            $user_id,
            $data['preferred_cuisine_type'],
            $data['num_people'],
            $data['distance_miles'],
            $data['longitude'],
            $data['latitude'],
            $data['total_budget'],
            $data['num_appetizer'],
            $data['num_main_course'],
            $data['num_dessert'],
            $data['num_drink']
        ]);

        return $result;
    }

    public function cancelAuction($user_id) {
        $this->db->connect();
        $query = <<<SQL
            UPDATE
                user_requests
            SET
                is_live = 0
            WHERE
                user_id = ?
            AND
                is_live = 1;
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        return $result;
    }

    public function getBids($user_id) {
        $this->db->connect();
        $query = <<<SQL
            SELECT
                offer_id,
                request_id,
                offer_details,
                menu_id,
                special_offer_id,
                meal_set_id,
                price
            FROM 
                offers
            WHERE
                request_id = (
                    SELECT
                        request_id
                    FROM
                        user_requests
                    WHERE
                        user_id = ?
                    AND
                        is_live = 1
                );
        SQL;
        $result = $this->db->doRawQuery($query, [$user_id]);

        $bids = [];
        if ($result->num_rows > 0) {
            while ($obj = $result->fetch_object()) {
                $bids[] = $obj;
            }
        }

        return $bids;
    }
}
