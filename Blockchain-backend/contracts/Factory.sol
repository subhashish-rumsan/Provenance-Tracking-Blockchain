// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import { Car } from "./Car.sol";

import { CarShare } from "./CarShare.sol";

contract Factory {
    mapping(address => address) public tokenInstances;

    function createErc20(string memory _name, string memory _symbol) public returns (address) {
        return address(new CarShare(_name, _symbol));
    }

    function mintCar(string memory _name, string memory _symbol, string memory _uri, uint256 _price) external{
        address erc20 = createErc20(_name, _symbol);
        address car = address(new Car(_name, _symbol, _uri, _price, erc20));
        tokenInstances[msg.sender] = car;
    }
}