<?php

class Controller {

    protected $endpoints;

    public function route(string $method, string $endpoint, Array $query_string, Array $bin_data, Array $cookies) {
        if (isset($this->endpoints[$method][$endpoint])) {
            
            // check that user is logged in if endpoint requires it
            if (isset($this->endpoints[$method][$endpoint]['auth'])) {
                if ($this->endpoints[$method][$endpoint]['auth']) {
                    if (!isset($cookies[SESS_ID])) {
                        echo (new HttpResponse)->json(new ErrorRes('not logged in'));
                        return;
                    }

                    $cookie_path = SESS_COOKIES_PATH . "/sess_" . $cookies[SESS_ID];
                    if (!file_exists($cookie_path)) {
                        # current cookie user provided is not valid (anymore?)
                        echo (new HttpResponse)->json(new ErrorRes('not logged in'));
                        return;
                    }
                }
            }

            // check for required data
            if (isset($this->endpoints[$method][$endpoint]['data'])) {
                foreach ($this->endpoints[$method][$endpoint]['data'] as $data) {
                    if (!isset($bin_data[$data])) {
                        echo (new HttpResponse)->json(new ErrorRes('missing data: ' . $data));
                        return;
                    }
                }
            }

            // check for missing query string data
            if (isset($this->endpoints[$method][$endpoint]['query'])) {
                foreach ($this->endpoints[$method][$endpoint]['query'] as $query) {
                    if (!isset($query_string[$query])) {
                        echo (new HttpResponse)->json(new ErrorRes('missing query: ' . $query));
                        return;
                    }
                }
            }

            $result = $this->{$this->endpoints[$method][$endpoint]["function"]}($query_string, $bin_data, $cookies);
            
            echo (new HttpResponse)->json($result);
        } else {
            echo '"' . $endpoint . '" not found';
        }
    }
}
