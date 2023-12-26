// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import { Car } from "./Car.sol";

import { CarShare } from "./CarShare.sol";

import { ICar } from "../interfaces/ICarShare.sol";

contract Factory {
    mapping(address => address) public tokenInstances;
    address[] private  cars;

    function createErc20(string memory _name, string memory _symbol) public returns (address) {
        return address(new CarShare(_name, _symbol, msg.sender));
    }

    function mintCar(string memory _name, string memory _symbol, string memory _uri, uint256 _price) external{
        address erc20 = createErc20(_name, _symbol);
        address car = address(new Car(_name, _symbol, _uri, _price, erc20, msg.sender));
        tokenInstances[msg.sender] = car;
        cars.push(car);
    }

    /**
     * @dev Get all cars with their uri
     */
    function getAllCars() external view returns (address[] memory keys, string[] memory values) {
        uint256 length = cars.length;
        keys = new address[](length);
        values = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            address car = cars[i];
            keys[i] = car;
            values[i] = ICar(car).getUri(); // contractAdd => 721 IERC721(address)
        }

        return (keys, values);
    }

    /**
     * @dev Get all owners with share of a car
     */
    function getAllOwners (address car) external view returns (address[] memory keys, uint256[] memory values){
        return ICar(car).getAllOwners();
    }
}