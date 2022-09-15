// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import "./axsToken.sol";
import "./skyToken.sol";

contract dex {
    axsToken public AxsToken;
    skyToken public SkyToken;
    
  event TokenPurchased(
    address account,
    address token,
    uint amount
  );
  event TokensSold(
    address account,
    address token,
    uint amount
  );
  event TokensSwaped(
    address account,
    address token1,
    address token2,
    uint amount
  );


    constructor() {
        AxsToken = new axsToken();
        SkyToken= new skyToken();
        
    }

    function buy(ERC20 token, uint tokenAmount) public payable {

         
          require(token.balanceOf(address(this)) >= tokenAmount);
          token.transfer(msg.sender, tokenAmount);
          emit TokenPurchased(msg.sender, address(SkyToken), tokenAmount);

        

    }

    function sell(ERC20 token, uint tokenAmount, uint ethAmount) public{

        
        token.transferFrom(msg.sender, address(this), tokenAmount);
        payable(msg.sender).transfer(ethAmount);
        emit TokensSold(msg.sender, address(token), tokenAmount);

    }

    function swapToken(
        ERC20 token1,
        ERC20 token2,
        uint256 token1Amount,
        uint256 token2Amount
    ) public {
        token1.transferFrom(msg.sender, address(this), token1Amount);
        token2.transfer(msg.sender, token2Amount);
        emit TokensSwaped(msg.sender, address(token1), address(token2), token1Amount);
    }

    
}
