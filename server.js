const express = require('express');
const solc = require('solc');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

let app = express();
app.use(cors());

app.listen(3000);

app.get('/', function(req, res) {
    const contractPath = path.resolve(__dirname, 'contracts', 'FoodChain.sol');
    let contractSource = fs.readFileSync(contractPath).toString('UTF-8');

    var solcInput = {
        language: "Solidity",
        sources: { 
            contract: {
                content: contractSource
            }
         },
        settings: {
            optimizer: {
                enabled: true
            },
            evmVersion: "byzantium",
            outputSelection: {
                "*": {
                  "": [
                    "legacyAST",
                    "ast"
                  ],
                  "*": [
                    "abi",
                    "evm.bytecode.object",
                    "evm.bytecode.sourceMap",
                    "evm.deployedBytecode.object",
                    "evm.deployedBytecode.sourceMap",
                    "evm.gasEstimates"
                  ]
                },
            }
        }
    };
    
    solcInput = JSON.stringify(solcInput);
    let contractObject = solc.compile(solcInput);
    contractObject = JSON.parse(contractObject);
    
    res.status(200);
    res.send(contractObject);
});