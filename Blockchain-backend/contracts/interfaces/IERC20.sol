// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20 {
    function _mint(address owner) external;

    function _transferToken(address from, address to, uint256 value) external;

    function _getShare(address user) external view returns (uint256);

    function _getTotalShare() external view returns (uint256);

    function _getToken() external view returns (string memory, string memory);
}
