// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarOwnershipToken is ERC20, Ownable {
    uint256 private _cap;

    constructor(uint256 cap_) ERC20("CarShares", "CSH") {
        require(cap_ > 0, "Cap must be greater than zero");
        _cap = cap_;
    }

    function cap() public view returns (uint256) {
        return _cap;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= _cap, "Cap exceeded");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
