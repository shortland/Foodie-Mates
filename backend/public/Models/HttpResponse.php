<?php

class HttpResponse {
    public function __construct() {}

    public function json($data) {
        if (!is_array($data)) {
            return json_encode ([
                'status' => 200,
                'data' => $data
            ]);
        } else {
            return json_encode ([
                'status' => $data[0],
                'data' => $data[1]
            ]);
        }
    }
}
