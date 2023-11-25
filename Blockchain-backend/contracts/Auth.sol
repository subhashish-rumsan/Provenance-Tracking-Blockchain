// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "hardhat/console.sol";

struct UserCredentials {
    address walletAddress;
    string username;
    string password;
}

contract Auth {
    mapping(address => UserCredentials) user;

    function register(
        address _address,
        string memory _username,
        string memory _password
    ) public returns (bool) {
        require(
            user[_address].walletAddress != msg.sender,
            "User already exists"
        );
        user[_address].walletAddress = _address;
        user[_address].username = _username;
        user[_address].password = _password;
        return true;
    }
}
