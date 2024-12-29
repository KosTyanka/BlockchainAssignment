# Assignment 1: Blockchain Technologies

#### Project Overview
This repository contains a simple Ethereum smart contract (**test.sol**) that:
- Can receive Ether from external accounts.
- Lets only the contract owner withdraw all Ether from the contract.
- Provides a method to check the contract’s current balance.

Additionally, the project includes:
- **Web3.js** scripts for compiling, deploying, and interacting with the contract.
- Examples of sending Ether to the contract and withdrawing Ether from it.
- Setup instructions for Ganache or any public Ethereum testnet.
- References for MetaMask and other tools.

---

#### Usage

**Compile the Contract**  
Compile with either `compileTest.js` or any other compile script:
```bash
node compileTest.js
```
This generates the `.bin` and `.json` files for the contract.

**Deploy the Contract**  
Ensure Ganache (or any public testnet) is running. Then:
```bash
node deployTest.js
```
This writes the deployed contract address to `MyTestContractAddress.txt`.

**Send Ether**
```bash
node sendEth.js
```
Sends 1 ETH from your default account to the contract address.

**Withdraw Ether**
```bash
node withdrawEth.js
```
Calls the contract’s `withdrawAll()` function (only the owner can do this).

**Interact Script**  
Alternatively, use the combined `interactTest.js` which:
- Checks balance
- Sends Ether
- Withdraws Ether
- Logs final balance

---

#### Screenshots
Below are some screenshots demonstrating the process:

1. **Sending & Withdrawing Ether**  
2. **Command-Line Usage**  
3. **Interact Script Command**  
4. **Interact Script Results**  

---

#### Examples

**Compile**:
```bash
node compileTest.js
```

**Deploy (Ganache or Testnet)**:
```bash
node deployTest.js
```

**Send Ether**:
```bash
node sendEth.js
```

**Withdraw Ether**:
```bash
node withdrawEth.js
```

**Interact Combined**:
```bash
node interactTest.js
```
```
