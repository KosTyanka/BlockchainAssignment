const { Web3 } = require('web3');
const path = require('path');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

const deployedAddressPath = path.join(__dirname, 'MyTestContractAddress.txt');
const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8').trim();

const abi = require('./MyTestContractAbi.json');
const myTestContract = new web3.eth.Contract(abi, deployedAddress);

myTestContract.handleRevert = true;

async function sendEth() {
  try {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    console.log('Account:', defaultAccount);

    let currentBalance = await myTestContract.methods.getBalance().call();
    console.log('Current contract balance:', currentBalance, 'wei');

    console.log('Sending 1 ETH to the contract...');
    await web3.eth.sendTransaction({
      from: defaultAccount,
      to: deployedAddress,
      value: web3.utils.toWei('1', 'ether'),
      gas: 1000000, 
    });

    currentBalance = await myTestContract.methods.getBalance().call();
    console.log('Contract balance now:', currentBalance, 'wei');
  } catch (error) {
    console.error('Error in sendEth:', error);
  }
}

sendEth();
