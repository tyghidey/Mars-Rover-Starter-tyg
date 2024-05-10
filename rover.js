class Rover {
   constructor(position) {
   this.position = position;
   if(!position){
      throw Error("Rover position required.");
    }
   this.mode = "NORMAL";
   this.generatorWatts = 110;
   }

   receiveMessage(theMessage) {
      let response = {
        message: theMessage.name,
        results: []
      };
    
    for (let i = 0; i < theMessage.commands.length; i++) {
      if(theMessage.commands[i].commandType === "MOVE") {
        if(this.mode === 'LOW_POWER') {
          response.results.push({completed: false});
        }else{
          response.results.push({completed: true});
          this.position = theMessage.commands[i].value;
        }
      } else if (theMessage.commands[i].commandType === "STATUS_CHECK") {
          response.results.push({
            completed: true, 
            roverStatus: {
              mode: this.mode, 
              generatorWatts: this.generatorWatts, 
              position: this.position
            }
            });
      } else if(theMessage.commands[i].commandType === "MODE_CHANGE") {
        response.results.push({completed: true});
        this.mode = theMessage.commands[i].value;
      }else{
        throw Error("Command Type undefinded.");
      }
    }

      return response;
    }
  }
      
module.exports = Rover;