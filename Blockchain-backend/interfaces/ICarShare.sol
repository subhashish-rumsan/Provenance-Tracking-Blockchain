// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface ICarShare {
   function mint(address owner) external;
   function transferToken(address from, address to, uint256 value) external ;
   function getShare(address user) external view  returns (uint256);
    function getTotalShare() external view  returns (uint256);
    function getTokens() external view  returns (string memory, string memory);
}

interface ICar {
    function getUri() external view returns (string memory);
    function getAllOwners () external view returns (address[] memory keys, uint256[] memory values);
}