// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title TerraChain
 * @dev Smart contract for land record management on the blockchain
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract TerraChain {
    // Struct to store land record data
    struct LandRecord {
        string recordId;        // Unique identifier for the land record
        string owner;           // Current owner of the land
        string location;        // Physical location description
        uint256 area;           // Area of the land in square meters
        string surveyNumber;    // Government survey number
        string district;        // Administrative district
        string state;           // State where land is located
        string status;          // Status: pending, verified, disputed
        string documentHash;    // IPFS hash of the land document
        uint256 timestamp;      // Timestamp when record was created/updated
        address verifier;       // Address of the authority who verified the record
    }
    
    // Mapping from record ID to land record
    mapping(string => LandRecord) private landRecords;
    
    // Array to store all record IDs
    string[] private recordIds;
    
    // Mapping from owner name to their record IDs
    mapping(string => string[]) private ownerToRecords;
    
    // Events
    event RecordAdded(string recordId, string owner, uint256 timestamp);
    event RecordUpdated(string recordId, string owner, uint256 timestamp);
    event RecordVerified(string recordId, address verifier, uint256 timestamp);
    event OwnershipTransferred(string recordId, string previousOwner, string newOwner, uint256 timestamp);
    
    // Modifiers
    modifier recordExists(string memory _recordId) {
        require(bytes(landRecords[_recordId].recordId).length > 0, "Record does not exist");
        _;
    }
    
    /**
     * @dev Add a new land record
     * @param _recordId Unique identifier for the record
     * @param _owner Name of the land owner
     * @param _location Physical location of the land
     * @param _area Area of the land in square meters
     * @param _surveyNumber Government survey number
     * @param _district Administrative district
     * @param _state State where land is located
     * @param _documentHash IPFS hash of the land document
     */
    function addLandRecord(
        string memory _recordId,
        string memory _owner,
        string memory _location,
        uint256 _area,
        string memory _surveyNumber,
        string memory _district,
        string memory _state,
        string memory _documentHash
    ) public {
        require(bytes(landRecords[_recordId].recordId).length == 0, "Record already exists");
        
        LandRecord memory newRecord = LandRecord({
            recordId: _recordId,
            owner: _owner,
            location: _location,
            area: _area,
            surveyNumber: _surveyNumber,
            district: _district,
            state: _state,
            status: "pending",
            documentHash: _documentHash,
            timestamp: block.timestamp,
            verifier: address(0)
        });
        
        landRecords[_recordId] = newRecord;
        recordIds.push(_recordId);
        ownerToRecords[_owner].push(_recordId);
        
        emit RecordAdded(_recordId, _owner, block.timestamp);
    }
    
    /**
     * @dev Update an existing land record
     * @param _recordId ID of the record to update
     * @param _location Updated location
     * @param _area Updated area
     * @param _documentHash Updated document hash
     */
    function updateLandRecord(
        string memory _recordId,
        string memory _location,
        uint256 _area,
        string memory _documentHash
    ) public recordExists(_recordId) {
        LandRecord storage record = landRecords[_recordId];
        
        record.location = _location;
        record.area = _area;
        record.documentHash = _documentHash;
        record.timestamp = block.timestamp;
        record.status = "pending"; // Reset verification status after update
        
        emit RecordUpdated(_recordId, record.owner, block.timestamp);
    }
    
    /**
     * @dev Verify a land record
     * @param _recordId ID of the record to verify
     */
    function verifyRecord(string memory _recordId) public recordExists(_recordId) {
        LandRecord storage record = landRecords[_recordId];
        record.status = "verified";
        record.verifier = msg.sender;
        
        emit RecordVerified(_recordId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Mark a record as disputed
     * @param _recordId ID of the record to mark as disputed
     */
    function markAsDisputed(string memory _recordId) public recordExists(_recordId) {
        LandRecord storage record = landRecords[_recordId];
        record.status = "disputed";
        
        emit RecordUpdated(_recordId, record.owner, block.timestamp);
    }
    
    /**
     * @dev Transfer ownership of a land record
     * @param _recordId ID of the record to transfer
     * @param _newOwner Name of the new owner
     */
    function transferOwnership(
        string memory _recordId,
        string memory _newOwner
    ) public recordExists(_recordId) {
        LandRecord storage record = landRecords[_recordId];
        string memory previousOwner = record.owner;
        
        // Remove record from previous owner's list
        string[] storage previousOwnerRecords = ownerToRecords[previousOwner];
        for (uint i = 0; i < previousOwnerRecords.length; i++) {
            if (keccak256(bytes(previousOwnerRecords[i])) == keccak256(bytes(_recordId))) {
                // Replace with the last element and pop
                previousOwnerRecords[i] = previousOwnerRecords[previousOwnerRecords.length - 1];
                previousOwnerRecords.pop();
                break;
            }
        }
        
        // Update record owner
        record.owner = _newOwner;
        record.status = "pending"; // Reset verification status after transfer
        record.timestamp = block.timestamp;
        
        // Add to new owner's list
        ownerToRecords[_newOwner].push(_recordId);
        
        emit OwnershipTransferred(_recordId, previousOwner, _newOwner, block.timestamp);
    }
    
    /**
     * @dev Get a land record by ID
     * @param _recordId ID of the record to retrieve
     * @return Land record data
     */
    function getLandRecord(string memory _recordId) public view recordExists(_recordId) returns (
        string memory recordId,
        string memory owner,
        string memory location,
        uint256 area,
        string memory surveyNumber,
        string memory district,
        string memory state,
        string memory status,
        string memory documentHash,
        uint256 timestamp,
        address verifier
    ) {
        LandRecord memory record = landRecords[_recordId];
        return (
            record.recordId,
            record.owner,
            record.location,
            record.area,
            record.surveyNumber,
            record.district,
            record.state,
            record.status,
            record.documentHash,
            record.timestamp,
            record.verifier
        );
    }
    
    /**
     * @dev Get all record IDs
     * @return Array of record IDs
     */
    function getAllRecordIds() public view returns (string[] memory) {
        return recordIds;
    }
    
    /**
     * @dev Get record IDs by owner
     * @param _owner Owner name to query
     * @return Array of record IDs belonging to the owner
     */
    function getRecordsByOwner(string memory _owner) public view returns (string[] memory) {
        return ownerToRecords[_owner];
    }
    
    /**
     * @dev Get the total number of records
     * @return Total number of records
     */
    function getTotalRecords() public view returns (uint256) {
        return recordIds.length;
    }
}
