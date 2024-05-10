const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382); 
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  it("responds correctly to the status check command", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    let roverInfo = {mode: ("LOW_POWER"), generatorWatts: (rover.generatorWatts), position: (rover.position)};
    expect(response.results[1].roverStatus).toEqual(roverInfo);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing mode to LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message); 
    expect(response.results[0].completed).toEqual(true);
  });

    it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 2000)];
      let message = new Message('Can not move while at LOW_POWER mode', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[1]).toEqual({completed: false});
    });
  
    it("responds with position for move command", function() {
      let commands = [new Command('MOVE', 2000)];
      let message = new Message('Moving to position 2000', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(rover.position).toEqual(2000);
    });
  
  });
