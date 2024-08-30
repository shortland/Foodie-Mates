<?php

class HomeController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/' => "index",
                '' => "index"
            ],
            'POST' => [
                '/' => 'ok',
                '' => 'ok'
            ],
            'PUT' => [
                '/' => 'ok',
                '' => 'ok'
            ],
            'DELETE' => [
                '/' => 'ok',
                '' => 'ok'
            ]
        ];
    }

    function index($args) {
        return 'hello world!' . json_encode($args);
    }

    function ok() {
        return 'that method isnt supported here';
    }
}
