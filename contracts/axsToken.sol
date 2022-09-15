// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract axsToken is ERC20 {
  
  uint public constant total = 1000000;

  constructor() ERC20("Axie Tokens", "AXS") {
    _mint(msg.sender, total * (10** decimals()) );
  }

}
