// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Few lines of code is given for your help, complete the rest. You can do it :)
contract Wallet {

    event transferred(uint256 amount);
    
    function send(address payable _addr, uint256 amount) payable public{
  
         emit transferred(amount);
        
    }
}
