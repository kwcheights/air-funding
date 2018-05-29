//in teoria solodity crea automaticamente i getter delle var public, ma non i setter
pragma solidity 0.4.23;

contract Holidays{
	address public deployer;
	travel[] private travels;

	struct travel {
		uint id;
		address agency;
		address owner;
		uint goal;
		uint balance;
		bool closed;

		address[] contributors;
		mapping(address => uint) travelDeposits;
		string img;
		string destination;
	}

	constructor() public {
		deployer = msg.sender;
	}


	//PAYABLES --------------------------------------------------------------------------------------------------------------------
	function deposit(uint travelId) public payable {
		require(travels[travelId].closed == false);
		travels[travelId].travelDeposits[msg.sender] += msg.value;
		travels[travelId].balance += msg.value;
		if (!checkContributor(msg.sender, travelId)) {
			travels[travelId].contributors.push(msg.sender);
		}

		if(travels[travelId].balance > travels[travelId].goal) {
			travels[travelId].closed = true;
			travels[travelId].agency.transfer(travels[travelId].goal);
			travels[travelId].balance -= travels[travelId].goal;
			travels[travelId].travelDeposits[msg.sender] -= travels[travelId].balance;
			msg.sender.transfer(travels[travelId].balance);
			travels[travelId].balance = 0;

		} else if (travels[travelId].balance == travels[travelId].goal) {
			travels[travelId].closed = true;
			travels[travelId].agency.transfer(travels[travelId].goal);
			travels[travelId].balance = 0;
		}
	}


	//INTERACTIONS ----------------------------------------------------------------------------------------------------------------
	function createTravel(address _agency, uint _goal, string _destination, string _img) public returns(uint){
		travel memory tempTravel;
		uint id = travels.length;
		tempTravel.id = id;
		tempTravel.agency = _agency;
		tempTravel.owner = msg.sender;
		tempTravel.goal = _goal;
		tempTravel.balance = 0;
		tempTravel.closed = false;
		tempTravel.img = _img;
		tempTravel.destination = _destination;
		travels.push(tempTravel);
		return id;
	}
   
	function abortTravel(uint travelId) public { //HIGH COST
		require(travelId < travels.length);
		travels[travelId].closed = true;
		for (uint i=0; i<travels[travelId].contributors.length; i++) {
			travels[travelId].contributors[i].transfer(travels[travelId].travelDeposits[travels[travelId].contributors[i]]);
		}
	}

	function getTravelAgency(uint travelId) public view returns(address) {
		return travels[travelId].agency;
	}

	function getTravelOwner(uint travelId) public view returns(address) {
		return travels[travelId].owner;
	}

	function getTravelGoal(uint travelId) public view returns(uint) {
		return travels[travelId].goal;
	}

	function getTravelBalance(uint travelId) public view returns(uint) {
		return travels[travelId].balance;
	}

	function getTravelIsClosed(uint travelId) public view returns(bool) {
		return travels[travelId].closed;
	}

	function getTravelImage(uint travelId) public view returns(string) {
		return travels[travelId].img;
	}

	function getTravelDestination(uint travelId) public view returns(string) {
		return travels[travelId].destination;
	}


	//UTILS -------------------------------------------------------------------------------------------------------------------------
	function checkContributor(address contributor, uint travelId) internal view returns(bool) {
		bool found = false;
		uint i = 0;
		while ((i < travels[travelId].contributors.length) && (found == false)) {
			if (travels[travelId].contributors[i] == contributor) {
				found = true;
			}
			i++;
		}
		return found;
	}

	//BIG RED BUTTON: -------------------------------------------------------------------------------------------------------------
	function distructor() returns(bool){
		require(msg.sender == deployer);
		if (returnFunds()){
			selfdestruct(deployer);
			return true;
		} else return false;
	}

	function returnFunds() internal returns(bool) {
		for (uint i = 0; i < travels.length ; i++) {
			abortTravel(i);
		}
		return true;
	}
}