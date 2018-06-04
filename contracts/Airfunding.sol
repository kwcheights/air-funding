//in teoria solodity crea automaticamente i getter delle var public, ma non i setter
pragma solidity 0.4.23;

contract Airfunding{
	address public deployer;
	string[] private travelIds;
	mapping(string => travel) private travels;

	struct travel {
		string id; //L'indice è ridondante con l'array per comodità. Viene ottenuto lato JS con sh3 della concat. di destinazione, transazione e owner 
		string title;
		uint inArrayIndex;
		address owner;
		uint goal;
		uint balance;

		address[] contributors;
		mapping(address => uint) travelDeposits;
		string destination;
		string description;
		uint startDate; 
		uint expirationDate;
		string img;
		bool closed;
	}

	constructor() public {
		deployer = msg.sender;
	}


	//PAYABLES --------------------------------------------------------------------------------------------------------------------
	function deposit(string travelId) public payable {
		require(travels[travelId].closed == false);
		travels[travelId].travelDeposits[msg.sender] += msg.value;
		travels[travelId].balance += msg.value;
		if (!checkContributor(msg.sender, travelId)) {
			travels[travelId].contributors.push(msg.sender);
		}

		if(travels[travelId].balance > travels[travelId].goal) {
			travels[travelId].closed = true;
			travels[travelId].owner.transfer(travels[travelId].goal);
			travels[travelId].balance -= travels[travelId].goal;
			travels[travelId].travelDeposits[msg.sender] -= travels[travelId].balance;
			msg.sender.transfer(travels[travelId].balance);
			travels[travelId].balance = 0;

		} else if (travels[travelId].balance == travels[travelId].goal) {
			travels[travelId].closed = true;
			travels[travelId].owner.transfer(travels[travelId].goal);
			travels[travelId].balance = 0;
		}
	}


	//INTERACTIONS ----------------------------------------------------------------------------------------------------------------
	function createTravel(string _id, string title, address _owner, uint _goal, string _destination, string _description, uint _start, uint _expiration, string _img) public {
		travelIds.push(_id);
		//string memory _id = keccak256(block.number, msg.sender);
		travels[_id].id = _id;
		travels[_id].inArrayIndex = travelIds.length-1;
		travels[_id].owner = msg.sender;
		travels[_id].goal = _goal;
		travels[_id].balance = 0;
		travels[_id].closed = false;
		travels[_id].img = _img;
		travels[_id].destination = _destination;
		travels[_id].startDate = _start;
		travels[_id].expirationDate = _expiration;
		travels[_id].description = _description;
	}
   
	function abortTravel(string travelId) public { //HIGH COST
		require(travels[travelId].owner!=0); //provvisorio
		travels[travelId].closed = true;
		for (uint i=0; i<travels[travelId].contributors.length; i++) {
			travels[travelId].contributors[i].transfer(travels[travelId].travelDeposits[travels[travelId].contributors[i]]);
		}
	}

	function getNumberOfTravels() public view returns(uint) {
		return travelIds.length;
	}

	function getTravelId(uint index) public view returns(string) {
		return travelIds[index];
	}

	function getTravelTitle(string travelId) public view returns(string) {
		return travels[travelId].title;
	}

	function getTravelOwner(string travelId) public view returns(address) {
		return travels[travelId].owner;
	}

	function getTravelGoal(string travelId) public view returns(uint) {
		return travels[travelId].goal;
	}

	function getTravelBalance(string travelId) public view returns(uint) {
		return travels[travelId].balance;
	}

	function getTravelIsClosed(string travelId) public view returns(bool) {
		return travels[travelId].closed;
	}

	function getTravelImage(string travelId) public view returns(string) {
		return travels[travelId].img;
	}

	function getTravelDestination(string travelId) public view returns(string) {
		return travels[travelId].destination;
	}

	function getTravelDescription(string travelId) public view returns(string) {
		return travels[travelId].description;
	}

	function getNumberOfContributors(string travelId) public view returns(uint) {
		return travels[travelId].contributors.length;
	}


	//UTILS -------------------------------------------------------------------------------------------------------------------------
	function checkContributor(address contributor, string travelId) internal view returns(bool) {
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
		for (uint i = 0; i < travelIds.length ; i++) {
			abortTravel(travelIds[i]);
		}
		return true;
	}
}