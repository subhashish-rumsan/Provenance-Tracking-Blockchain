// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./TDToken.sol";

/**
 * @title TokenDriveNFT
 * @dev Contract to mint NFTs for each individiual cars
 */
contract TokenDriveNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    CarOwnershipToken public ownershipToken;

    /**
     * @dev Transfer NFT to a new owner with a new ownership percentage.
     * @param initialOwner address of the actual car owner
     * @param _carModel represents car model
     */

    constructor(
        address initialOwner,
        string memory _carModel,
        uint256 _numberPlate,
        string memory _carInformation
    ) ERC721(_carModel, "TD") Ownable(initialOwner) {
        ownershipToken = new CarOwnershipToken(1000000);
        minfNFT(initialOwner, _numberPlate, _carInformation);
    }

    function buyShares(uint256 numberOfShares) public {
        // Mint ERC20 tokens representing the shares to the buyer
        ownershipToken.mint(msg.sender, numberOfShares);
        // Transfer ERC721 ownership
        _transfer(ownerOf(_tokenId), msg.sender, _tokenId);
        // Update any other relevant data to reflect the new ownership
        // ...
    }

    function sellShares(uint256 numberOfShares, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "You don't own this token");
        // Burn ERC20 tokens representing the shares from the seller
        ownershipToken.burn(msg.sender, numberOfShares);
        // Transfer ERC721 ownership back to the original owner or a different recipient
        _transfer(msg.sender, ownerOf(_tokenId), _tokenId);
        // Update any other relevant data to reflect the new ownership
        // ...
    }

    /**
     * @dev This mintNFT functions gets executed inside the constructor. The seller uploading the car mints this contract.
     * @param to parameter represents the address of the car owner. It can be a company or an individual.
     * @param uri represents the metadata of the car. This includes IPFS hash of the car images, car information, etc.
     */
    function mintNFT(
        address to,
        uint256 tokenId,
        string memory uri
    ) private onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

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
