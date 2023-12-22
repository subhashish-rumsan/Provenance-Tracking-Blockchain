// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FactoryContract {
    // Mapping to store deployed child contracts
    mapping(address => address) public deployedContracts;

    // Function to deploy a new ERC721 contract
    function deployNewContract(
        string memory name,
        string memory symbol
    ) public {
        address childContract = new ERC721(name, symbol);
        deployedContracts[msg.sender] = childContract;
    }

    // Function to get the address of a deployed child contract for a sender
    function getDeployedContract() public view returns (address) {
        return deployedContracts[msg.sender];
    }
}
