// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "./lib/SaintGeorgeStateERC20.sol";

/**
 * @title SGSCoin
 * @dev Implementation of the Saint George State Coin
 */
contract SGSCoin is SaintGeorgeStateERC20 {

    constructor () SaintGeorgeStateERC20("Saint George State Coin", "Rupper") {}
}
