// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Auth {
    struct UserCredentials {
        bool registered;
        string email;
        string username;
        bytes32 passwordHash;
    }

    mapping(address => UserCredentials) public users;

    event UserRegistered(
        address indexed userAddress,
        string email,
        string username
    );
    event UserLogin(address indexed user, uint256 timestamp);

    function register(
        string calldata _email,
        string calldata _username,
        string calldata _password
    ) external returns (bool) {
        require(!users[msg.sender].registered, "User already exists");

        bytes32 passwordHash = keccak256(bytes(_password));

        users[msg.sender] = UserCredentials({
            registered: true,
            email: _email,
            username: _username,
            passwordHash: passwordHash
        });

        emit UserRegistered(msg.sender, _email, _username);
        return true;
    }

    function login(string calldata _password) external view returns (bool) {
        bytes32 passwordHash = keccak256(bytes(_password));

        require(users[msg.sender].registered, "User not registered");
        require(
            users[msg.sender].passwordHash == passwordHash,
            "Invalid credentials"
        );
        return true;
    }
}
