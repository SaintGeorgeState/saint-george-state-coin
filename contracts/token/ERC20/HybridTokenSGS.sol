// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "./lib/SaintGeorgeStateERC20.sol";

/**
 * @title HybridTokenSGS
 * @dev Implementation of the Hybrid Token Saint George State
 */
contract HybridTokenSGS is SaintGeorgeStateERC20 {

    constructor () SaintGeorgeStateERC20("Hybrid Token Saint George State", "HTSGS") {}
}
