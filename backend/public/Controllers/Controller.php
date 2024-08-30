<?php

class Controller {

    protected $endpoints;

    public function route(string $method, string $endpoint, Array $query_string) {
        if (isset($this->endpoints[$method][$endpoint])) {
            $result = $this->{$this->endpoints[$method][$endpoint]}($query_string);
            
            echo (new HttpResponse)->json($result);
        } else {
            echo '"' . $endpoint . '" not found';
        }
    }
}
