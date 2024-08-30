<?php

class RestaurantAuctionsController extends Controller {

    public function __construct() {
        $this->endpoints = [
            'GET' => [
                '/auctions/restaurant/nearby' => [
                    'description' => 'TODO: for a restaurant to see nearby available auctions',
                    'function' => 'nearbyAuctions',
                    'auth' => true
                ]
            ],
            'POST' => [
                '/auctions/restaurant/bid' => [
                    'description' => 'TODO: for a restaurant to bid on user auctions',
                    'function' => 'bid',
                    'auth' => true,
                    'data' => [
                        
                    ]
                ]
            ],
            'PUT' => [
                '/auctions/restaurant/update' => [
                    'description' => 'TODO: for a restaurant to update their bid on a user auction',
                    'function' => 'updateBid',
                    'auth' => true,
                    'data' => [
                        
                    ]
                ],
                // NOTE: no endpoint to update an auction, as it is not supported
                // that would be weird for bids
            ],
            'DELETE' => [
                '/auctions/restaurant/cancel' => [
                    'description' => 'TODO: for a restaurant to cancel their bid on a user auction',
                    'function' => 'cancelBid',
                    'auth' => true
                ]
            ]
        ];
    }
}
