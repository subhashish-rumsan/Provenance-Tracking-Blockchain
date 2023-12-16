// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TokenDriveNFT is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
    uint256 private pricePerShare;
    uint256 private maxSupply = 100;

    mapping(address => uint256) public ownershipPercentages;

    event OwnershipPercentagesUpdated(
        uint256 indexed id,
        address indexed owner,
        uint256 percentage
    );

    constructor(
        string memory _uri,
        uint256 _pricePerShare
    ) Ownable(msg.sender) ERC1155(_uri) {
        pricePerShare = _pricePerShare * 1 ether;
        _mint(msg.sender, 0, maxSupply, "Honda X");

        ownershipPercentages[msg.sender] = maxSupply;
    }

    //createa new car

    /**
     * @dev Modifier to check minimum share validation.
     */
    modifier onlyAboveMinimumShare(uint256 share) {
        require(
            share >= 10,
            "You have to buy or sell at least 10% of the share"
        );
        _;
    }

    /**
     * @dev Transfer NFT to a new owner with a new ownership percentage.
     */
    function transferWithPercentage(
        address from,
        address to,
        uint256 id,
        uint256 share
    ) external payable onlyAboveMinimumShare(share) {
        require(balanceOf(from, id) >= share, "Insufficient share to transfer");
        require(msg.value == share * pricePerShare, "Incorrect amount sent");

        // Transfer the NFT
        _safeTransferFrom(from, to, id, share, "");
        payable(from).transfer(share * pricePerShare);

        ownershipPercentages[from] -= share;
        ownershipPercentages[to] += share;

        emit OwnershipPercentagesUpdated(0, from, share);
    }

    /**
     * @dev Override function to update ownership.
     */
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
