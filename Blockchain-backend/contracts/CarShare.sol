// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { ICarShare } from "../interfaces/ICarShare.sol";

contract CarShare is ERC20, ICarShare{
    uint256 private totalShare = 100;

    constructor(string memory _name, string memory _symbol, address _owner) ERC20(_name, _symbol) {
        _mint(_owner, totalShare);
    }

    function mint (address owner) external {
        _mint(owner, totalShare);
    }

    function transferToken(address from, address to, uint256 value) external {
        _transfer(from, to, value);
    }
     
    function getShare(address user) external view returns (uint256) {
        return balanceOf(user);
    }
    
    function getTotalShare() external view  returns (uint256){
       return totalSupply();
    }

    function getTokens() external view  returns (string memory, string memory){
        return (name(), symbol());
    }
}