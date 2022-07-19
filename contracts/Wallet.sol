// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet {
  address payable public owner;

  event transferred(uint256 amount);
  constructor(){
    owner=payable(msg.sender);
  }


  function balanceOf() external view returns (uint){
    return address(owner).balance;
  }
  
    function send(address payable _addr, uint256 amount) payable public{
        require(amount >= 1 ether);
        require(msg.sender==owner);
        _addr.transfer(amount);
         emit transferred(amount);
        
    }
}
