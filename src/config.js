const abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelExpirationDate",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelGoal",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelStartDate",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "distructor",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNumberOfTravels",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelIsClosed",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelDescription",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getTravelId",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      },
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_goal",
        "type": "uint256"
      },
      {
        "name": "_destination",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_start",
        "type": "string"
      },
      {
        "name": "_expiration",
        "type": "string"
      },
      {
        "name": "_img",
        "type": "string"
      }
    ],
    "name": "createTravel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelDestination",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelImage",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getNumberOfContributors",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelTitle",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "deployer",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "getTravelInArrayIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "travelId",
        "type": "string"
      }
    ],
    "name": "abortTravel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
]

const ipfs = window.IpfsApi('localhost', 5002, {protocol: 'http'});
const address = '0xf12b5dd4ead5f743c6baa640b0216200e89b60da';
var instance = web3.eth.contract(abi);
var air = instance.at(address);
var ethPrice;

web3.eth.filter('latest', function(error, result){
  if (!error) {
    console.log('> watched');
    getTravelList().then(list => renderTravelList(list))
  } else console.log(error);
});