const solc = require('solc');
const path = require('path');
const fs = require('fs');

const fileName = 'test.sol';
const contractName = 'test';

const contractPath = path.join(__dirname, fileName);
const sourceCode = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    [fileName]: {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

const bytecode =
  compiledCode.contracts[fileName][contractName].evm.bytecode.object;

const bytecodePath = path.join(__dirname, 'MyTestContractBytecode.bin');
fs.writeFileSync(bytecodePath, bytecode);

console.log('Contract Bytecode:\n', bytecode);

const abi = compiledCode.contracts[fileName][contractName].abi;

const abiPath = path.join(__dirname, 'MyTestContractAbi.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));

console.log('Contract ABI:\n', abi);

