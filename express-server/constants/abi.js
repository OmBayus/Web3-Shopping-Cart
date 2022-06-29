module.exports = {
    abi: [
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
					"internalType": "bool",
					"name": "",
					"type": "bool"
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
			"name": "orderIsPaid",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
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
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
  };