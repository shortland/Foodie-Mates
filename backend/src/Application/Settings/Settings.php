<?php

declare(strict_types=1);

namespace App\Application\Settings;

class Settings implements SettingsInterface
{
    private array $settings;

    public function __construct(array $settings)
    {
        $this->settings = $settings;

        # hardcoded secrets cus who needs config files
        $this->settings['db']['host'] = 'localhost';
        $this->settings['db']['port'] = '3306';
        $this->settings['db']['name'] = 'satisfy';
        $this->settings['db']['user'] = 'root';
        $this->settings['db']['pass'] = 'badFood3579!';
    }

    /**
     * @return mixed
     */
    public function get(string $key = '')
    {
        return (empty($key)) ? $this->settings : $this->settings[$key];
    }
}
