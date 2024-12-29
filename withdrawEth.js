const { Web3 } = require('web3');
const path = require('path');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

const deployedAddressPath = path.join(__dirname, 'MyTestContractAddress.txt');
const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8').trim();

const abi = require('./MyTestContractAbi.json');
const myTestContract = new web3.eth.Contract(abi, deployedAddress);

myTestContract.handleRevert = true;

async function withdrawEth() {
  try {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    console.log('Account:', defaultAccount);

    let currentBalance = await myTestContract.methods.getBalance().call();
    console.log('Contract balance before withdrawal:', currentBalance, 'wei');

    console.log('Withdrawing all from the contract...');
    const withdrawReceipt = await myTestContract.methods.withdrawAll().send({
      from: defaultAccount,
      gas: 200000,
    });

    console.log('Withdraw transaction hash:', withdrawReceipt.transactionHash);

    currentBalance = await myTestContract.methods.getBalance().call();
    console.log('Final contract balance:', currentBalance, 'wei');
  } catch (error) {
    console.error('Error in withdrawEth:', error);
  }
}

withdrawEth();
