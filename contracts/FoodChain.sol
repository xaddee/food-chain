pragma solidity ^0.6.4;

contract FoodChain
{
    struct Location
    {
        string name;
        uint id;
        uint prevLocId;
        uint time;
        string secret;
    }

    mapping(uint => Location) trail;
    uint8 trailCount = 0;

    function GetTrailCount() public returns(uint8)
    {
        return trailCount;
    }

    function AddNewLocation(uint locationId, string memory name, string memory secret) public
    {
        Location memory newLoc;
        newLoc.name = name;
        newLoc.id = locationId;
        newLoc.secret = secret;
        newLoc.time = now;

        if (trailCount > 0)
        {
            newLoc.prevLocId = trail[trailCount].id;
        }

        trail[trailCount] = newLoc;
        trailCount++;
    }

    function GetLocation(uint8 trailNumber) public returns (string memory, uint, uint, uint, string memory)
    {
        return (trail[trailNumber].name,
                trail[trailNumber].id,
                trail[trailNumber].prevLocId,
                trail[trailNumber].time,
                trail[trailNumber].secret);
    }
}