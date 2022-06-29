// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Payment{

    mapping(string=>bool) public orderIsPaid;

    function pay (string memory _order) public{
        orderIsPaid[_order] = true;
    }

    function getOrder (string memory _order) public view returns(bool){
        return orderIsPaid[_order];
    }
}