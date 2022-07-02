module.exports = {
    abi: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_order",
					"type": "string"
				}
			],
			"name": "getOrder",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"name": "orderToAmountPaid",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_order",
					"type": "string"
				}
			],
			"name": "pay",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	],
  };