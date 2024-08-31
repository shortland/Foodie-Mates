<?php

class Db {

    private $username;

    private $password;

    private $host;

    private $database;

    private $connection;

    public function __construct(
        string $username,
        string $password,
        string $host,
        string $database
    ) {
        $this->username = $username;
        $this->password = $password;
        $this->host = $host;
        $this->database = $database;
    }

    /**
     * @throws Exception
     */
    public function connect() {
        $connection = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->database,
            3306
        );

        if (!$connection->set_charset("utf8mb4")) {
            throw new Exception(sprintf("Error loading character set utf8mb4: %s\n", $connection->error));
            exit();
        }

        if ($connection->connect_errno) {
            throw new Exception(sprintf("Db Error: Database connection failed: %s\n", $connection->connect_error));
            exit();
        }

        $this->connection = $connection;
    }

    /**
     * Executes a raw SQL query using prepared statements.
     * 
     * @param string $query The SQL query with placeholders.
     * @param array $params The parameters to bind to the query.
     * @param bool $verbose Whether to print the executed query.
     * 
     * @return mysqli_result|false The result set on success, or false on failure.
     * @throws Exception If the query fails to execute.
     */
    public function doRawQuery(string $query, array $params = [], bool $verbose = false) {
        // Prepare the statement
        $stmt = $this->connection->prepare($query);
        if (!$stmt) {
            throw new Exception(sprintf("Db Error: %s\n", $this->connection->error));
        }

        // Dynamically bind parameters if any are provided
        if (!empty($params)) {
            // Determine the types of the parameters
            $types = str_repeat('s', count($params)); // Assuming all params are strings
            $stmt->bind_param($types, ...$params);
        }

        // Print the executed query if verbose mode is on (debugging purpose)
        if ($verbose) {
            echo $query . " [" . implode(", ", $params) . "]";
        }

        // Execute the statement
        if (!$stmt->execute()) {
            throw new Exception(sprintf("Db Error: %s\n", $stmt->error));
        }

        // Return the result
        $result = $stmt->get_result();
        $stmt->close();

        return $result;
    }
}
