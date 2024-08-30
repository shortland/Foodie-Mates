<?php

class UserAuctionsController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/auctions/user/self' => [
                    'description' => 'for a user to see their own auctions (only 1 live allowed. but this will have past ones too)',
                    'function' => 'myAuctions',
                    'auth' => true
                ]
            ],
            'POST' => [
                '/auctions/user/create' => [
                    'description' => 'for a user to create a new auction',
                    'function' => 'createAuction',
                    'auth' => true,
                    'data' => [
                        'preferred_cuisine_type',
                        'num_people',
                        'distance_miles',
                        'longitude',
                        'latitude',
                        'total_budget',
                        'num_appetizer',
                        'num_main_course',
                        'num_dessert',
                        'num_drink'
                    ]
                ]
            ],
            'PUT' => [
                '/auctions/user/accept' => [
                    'description' => 'TODO: for a user to accept a bid as winning bid for auction. will also end the auction',
                    'function' => 'acceptBid',
                    'auth' => true,
                    'data' => [
                        
                    ]
                ],
            ],
            'DELETE' => [
                '/auctions/user/cancel' => [
                    'description' => 'for a user to cancel their own live auction',
                    'function' => 'cancelAuction',
                    'auth' => true
                ],
            ]
        ];
    }

    function myAuctions(array $args, array $data, array $cookies) {
        $auction_qs = new AuctionsQueries();

        return $auction_qs->getUserAuctions($this->user_id);
    }

    function createAuction(array $args, array $data, array $cookies) {
        $auction_qs = new AuctionsQueries();

        // TODO: check user has valid payment method

        // check if user already has a live auction
        if ($auction_qs->userHasLiveAuction($this->user_id)) {
            return new ErrorRes('you already have a live auction');
        }

        $auction = $auction_qs->createAuction($this->user_id, $data);

        // TODO: send push notification to restaurants within radius
        // TODO: trigger autobids

        return $auction;
    }

    function cancelAuction(array $args, array $data, array $cookies) {
        $auction_qs = new AuctionsQueries();

        // check if user has a live auction
        if (!$auction_qs->userHasLiveAuction($this->user_id)) {
            return new ErrorRes('you do not have a live auction');
        }

        $auction = $auction_qs->cancelAuction($this->user_id);

        // TODO: send push notification to restaurants that bid

        return $auction;
    }
}
