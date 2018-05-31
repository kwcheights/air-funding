const abi = [{
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
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "string"
      },
      {
        "name": "title",
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
        "type": "uint256"
      },
      {
        "name": "_expiration",
        "type": "uint256"
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
  }]

  const ipfs = window.IpfsApi('localhost', 5002, {protocol: 'http'});
      const address = '0xf12b5dd4ead5f743c6baa640b0216200e89b60da';
      var instance = web3.eth.contract(abi);
      var air = instance.at(address);

  window.onload = function() {
        if (typeof web3 === 'undefined') {
          alert('You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example');
        } else alert("boh");
        console.log("mamt");
      }

  function createTravel() {
        var url = '';
        const reader = new FileReader();
        const photo = document.getElementById("img");
        var travelId = sha3_256(document.getElementById('title').value + web3.eth.coinbase);

        reader.readAsArrayBuffer(photo.files[0]);   
        reader.onloadend = function() {
          //const ipfs = window.IpfsApi('ipfs.infura.io', 5001, {protocol: 'https'}) // Connect to IPFS
           // Connect to IPFS
          const buf = buffer.Buffer(reader.result)
          console.log(buf); // Convert data into buffer
          ipfs.files.add(buf, function(err, result) { // Upload buffer to IPFS
            if(err) {
              console.error(err)
              return
            }
            //url = `https://ipfs.io/ipfs/${result[0].hash}`
            url = result[0].hash
            console.log(`Url --> ${url}`)
            air.createTravel(travelId, 
                                  document.getElementById('title').value, 
                                  web3.eth.coinbase, 
                                  web3.toWei(document.getElementById('goal').value, "ether"), 
                                  document.getElementById('dest').value, 
                                  document.getElementById('desc').value,
                                  Date.now(),
                                  document.getElementById('exp').value,
                                  url, function(error, result) {
            if (!error) {
            console.log(result);
            alert("EVERYTHING OK, your travel is on the blockchain");
            } else {
                console.log(error);
              }
            });
          })
        }
      }