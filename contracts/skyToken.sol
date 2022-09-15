// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract skyToken is ERC20 {
  
  uint public constant total = 1000000;

  constructor() ERC20("Skyweaver Token", "SKY") {
    _mint(msg.sender, total * (10** decimals()) );
  }

}
