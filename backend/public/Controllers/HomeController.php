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

    private function getControllerClasses() {
        // Get all PHP files in the directory
        $directory = getcwd() . '/Controllers';
        $files = glob($directory . '/*.php');
    
        // Include each PHP file
        foreach ($files as $file) {
            require_once $file;
        }
    
        // Get all declared classes
        $allClasses = get_declared_classes();
    
        // Filter classes based on the directory
        $classesInDir = [];
        foreach ($allClasses as $class) {
            // Reflector to get the file where the class is defined
            $reflector = new ReflectionClass($class);
            $classFile = $reflector->getFileName();
    
            // Check if the class file is in the given directory
            if (strpos($classFile, $directory) === 0) {
                $classesInDir[] = $class;
            }
        }
    
        return $classesInDir;
    }

    private function generateHtmlFromEndpoints($endpoints) {
        $html = '';
    
        foreach ($endpoints as $controller => $methods) {
            $html .= '<hr>';
            $html .= '<h3>' . htmlspecialchars($controller) . '</h3>';
    
            foreach ($methods as $method => $routes) {
                foreach ($routes as $route => $details) {
                    $html .= '<p>' . htmlspecialchars($method) . ': ' . htmlspecialchars($route) . '</p>';
                    if (isset($details['description'])) {
                        $details['description'] = str_replace('TODO:', "<p style='color:red;display:inline;'>TODO:</p>", $details['description']);
                        $details['description'] = str_replace('NOTE:', "<p style='color:purple;display:inline;'>NOTE:</p>", $details['description']);
                        $html .= '<p>description: <i>' . $details['description'] . '</i></p>';
                    }
                    if (isset($details['auth']) && $details['auth'] == 1) {
                        $html .= '<p>auth required</p>';
                    }
                    if (isset($details['query'])) {
                        $html .= '<p>query string: [' . implode(', ', array_map('htmlspecialchars', $details['query'])) . ']</p>';
                    }
                    if (isset($details['data'])) {
                        $html .= '<p>data: [' . implode(', ', array_map('htmlspecialchars', $details['data'])) . ']</p>';
                    }
                    $html .= '</br>';
                }
            }
        }
    
        $html .= '<hr>';
        return $html;
    }

    function index() {
        $classes = $this->getControllerClasses();
        
        // Remove the current class from the list
        if (($key = array_search(get_class($this), $classes)) !== false) {
            unset($classes[$key]);
        }

        // Remove base Controller class
        if (($key = array_search('Controller', $classes)) !== false) {
            unset($classes[$key]);
        }

        // iterate through each class, instantiate it, and get the endpoints for each
        $endpoints = [];
        foreach ($classes as $class) {
            $controller = new $class();
            $endpoints[$class] = $controller->endpoints;
        }

        // Generate HTML response
        $resp = <<<HTML
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Home</title>
                </head>
                <body>
                    <h1>Endpoints</h1>
                    %s
                </body>
            </html>
        HTML;

        return new HtmlRes(
            sprintf($resp, '<pre>' . $this->generateHtmlFromEndpoints($endpoints) . '</pre>')
        );
    }

    function ok() {
        return 'that method isnt really supported here';
    }
}
