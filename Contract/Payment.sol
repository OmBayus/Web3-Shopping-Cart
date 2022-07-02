// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Payment{

    mapping(string=>bool) public orderIsPaid;
    mapping(string=>uint256) public productToPrice;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function createProduct(string memory _product,uint256 _price) public onlyOwner{
        productToPrice[_product] = _price;
    }

    function pay (string memory _order,string memory _product) payable public{
        require(
            msg.value == productToPrice[_product] && productToPrice[_product] != 0,
            "You need to spend more ETH!"
        );
        owner.transfer(msg.value);
        orderIsPaid[_order] = true;
    }

    function getOrder (string memory _order) public view returns(bool){
        return orderIsPaid[_order];
    }

     modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}