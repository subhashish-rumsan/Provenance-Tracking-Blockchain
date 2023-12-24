// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { ICarShare } from "../interfaces/ICarShare.sol";

contract Car is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    ICarShare car;
    uint256 private pricePerShare;

    constructor(string memory _name, string memory _symbol,  string memory _uri, uint256 _price, address _erc20)
        ERC721(_name, _symbol)
        Ownable(msg.sender)
    {
        car = ICarShare(_erc20);
        safeMint(msg.sender, 0, _uri);
        pricePerShare = _price * 1e9;
        // set pricePerShare
    }

    modifier onlyAboveMinimumShare(uint256 share) {
        require(share >= 10, "You have to buy or sell at least 10% of the share");
        _;
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        private 
    {
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    /**
     * @dev transfer share
     * @param from address, to address, share number of new owner
     */
    function transferShare(address from, address to, uint256 share) external payable  onlyAboveMinimumShare(share) {
        require(car.getShare(from) > share, "Insufficient share to transfer");
        require(msg.value == share * pricePerShare, "Incorrect amount sent");

        car.transferToken(from, to, share);
        payable(from).transfer(share * pricePerShare);

    }

    /**
     * @dev Return price of unit share 
     * @return price of unit share
     */
    function getUnitPrice() external view returns (uint256){
        return pricePerShare;
    }

    /**
     * @dev Return total share of user 
     * @param user address of user
     * @return address of owner
     */
    function getShare(address user) external view returns (uint256){
        return car.getShare(user);
    }

    /**
     * @dev Return total share of NFT 
     * @return totalShare of NFT
     */
    function getTotalShare () external view returns (uint256){
        return car.getTotalShare();
    }
  
  // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}