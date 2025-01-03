const { Web3 } = require('web3');
const path = require('path');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545/');

const bytecodePath = path.join(__dirname, 'MyTestContractBytecode.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

const abi = require('./MyTestContractAbi.json');
const myContract = new web3.eth.Contract(abi);

myContract.handleRevert = true;

async function deploy() {
  try {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    console.log('Deployer account:', defaultAccount);

    const contractDeployer = myContract.deploy({
      data: '0x' + bytecode,
    });

    const gas = await contractDeployer.estimateGas({ from: defaultAccount });
    console.log('Estimated gas:', gas);

    const tx = await contractDeployer.send({
      from: defaultAccount,
      gas: gas,
      gasPrice: 10000000000,
    });
    console.log('Contract deployed at address:', tx.options.address);

    const deployedAddressPath = path.join(__dirname, 'MyTestContractAddress.txt');
    fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
    console.error('Deployment error:', error);
  }
}

deploy();
