// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract test {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawAll() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
