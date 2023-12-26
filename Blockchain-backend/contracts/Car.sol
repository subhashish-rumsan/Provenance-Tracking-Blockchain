// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { ICarShare, ICar } from "../interfaces/ICarShare.sol";

contract Car is ERC721, ERC721URIStorage, ICar, ERC721Burnable, Ownable {
    ICarShare car;
    uint256 private pricePerShare;
    address[] private shareOwners;

    event ShareTransferred(address indexed from, address indexed to, uint256 share);


    constructor(string memory _name, string memory _symbol,  string memory _uri, uint256 _price, address _erc20, address _owner)
        ERC721(_name, _symbol)
        Ownable(_owner)
    {
        car = ICarShare(_erc20);
        safeMint(_owner, 0, _uri);
        pricePerShare = _price * 1e9;
        shareOwners.push(_owner);
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
     * @dev Get all owners with shares
     */
    function getAllOwners () external view returns (address[] memory keys, uint256[] memory values) {
        uint256 length = shareOwners.length;
        keys = new address[](length);
        values = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address ownerAdd = shareOwners[i];
            keys[i] = ownerAdd;
            values[i] = car.getShare(ownerAdd); // contractAdd => 721 IERC721(address)
        }
        return (keys, values);
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

        // Emit the ShareTransferred event
        emit ShareTransferred(from, to, share);

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

    /**
     * @dev Return uri of the NFT
     */
    function getUri() external view  returns (string memory){
        return  tokenURI(0);
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