<?php

class HttpResponse {
    public function __construct() {}

    public function json($data) {
        if ($data instanceof ErrorRes) {
            new Header('text', true);

            return json_encode ([
                'status' => $data->error_code,
                'error' => $data->error_reason
            ]);
        } else if ($data instanceof HtmlRes) {
            new Header('html', true);

            return $data->html;
        } else {
            new Header('text', true);

            return json_encode ([
                'status' => 200,
                'data' => $data
            ]);
        }
        // if (!is_array($data)) {
        //     return json_encode ([
        //         'status' => 200,
        //         'data' => $data
        //     ]);
        // } else {
        //     return json_encode ([
        //         'status' => $data[0],
        //         'data' => $data[1]
        //     ]);
        // }

    }
}

class ErrorRes {
    
    public $error_reason;
    
    public $error_code;

    public function __construct($error_reason, $error_code = 500) {
        $this->error_reason = $error_reason;
        $this->error_code = $error_code;    
    }
}

class HtmlRes {
    
    public $html;

    public function __construct($html) {
        $this->html = $html;
    }
}