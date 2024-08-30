<?php

class HomeController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/' => [
                    'function' => 'index'
                ],
                '' => [
                    'function' => 'index'
                ]
            ],
            'POST' => [
                '/' => [
                    'function' => 'ok'
                ],
                '' => [
                    'function' => 'ok'
                ]
            ],
            'PUT' => [
                '/' => [
                    'function' => 'ok'
                ],
                '' => [
                    'function' => 'ok'
                ]
            ],
            'DELETE' => [
                '/' => [
                    'function' => 'ok'
                ],
                '' => [
                    'function' => 'ok'
                ]
            ]
        ];
    }

    function index() {
        return 'hello world!';
    }

    function ok() {
        return 'that method isnt really supported here';
    }
}
