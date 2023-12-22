// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {IERC20} from "./interfaces/IERC20.sol";

contract TDERC721 is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 public pricePerShare;

    address private erc20Address;

    constructor(
        string memory _name,
        string memory _symbol,
        address _initialOwner
    ) ERC721(_name, _symbol) Ownable(_initialOwner) {}

    function mintNFT(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function deployERC20(string memory _name, string memory _symbol) public {
        erc20Address = new MyToken20(_name, _symbol);
    }

    modifier onlyAboveMinimumShare(uint256 share) {
        require(
            share >= 10,
            "You have to buy or sell at least 10% of the share"
        );
        _;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
