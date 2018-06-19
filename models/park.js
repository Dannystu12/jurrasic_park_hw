const Park = function (name, ticketPrice, dinosaurs, daysOpen = 365){
  this.daysOpen = daysOpen;
  this.name = name;
  this.ticketPrice = ticketPrice;
  this.dinosaurs = dinosaurs.slice();
};

Park.prototype.addDinosaur = function (dinosaur){
  this.dinosaurs.push(dinosaur);
};

Park.prototype.removeDinosaur = function (dinosaur){
  this.dinosaurs = this.dinosaurs.filter(function(d){
    return d !== dinosaur
  });
};

Park.prototype.getHighestAttraction = function (){
  return this.dinosaurs.reduce(function (prevD, currentD){
    return prevD.guestsAttractedPerDay > currentD.guestsAttractedPerDay
    ? prevD : currentD;
  });
};

Park.prototype.getBySpecies = function (species){
  return this.dinosaurs = this.dinosaurs.filter(function(dinosaur){
    return dinosaur.species.toLowerCase() === species.toLowerCase();
  });
};

Park.prototype.removeBySpecies = function (species){
  this.dinosaurs = this.dinosaurs.filter(function(dinosaur){
    return dinosaur.species.toLowerCase() !== species.toLowerCase();
  });
};

Park.prototype.getVisitorsByDay = function (){
  return this.dinosaurs.reduce(function(total, dinosaur){
    return total + dinosaur.guestsAttractedPerDay;
  }, 0);
};

Park.prototype.getVisitorsByYear = function (){
  return this.getVisitorsByDay() * this.daysOpen;
};

Park.prototype.getRevenueByYear = function (){
  return this.getVisitorsByDay() * this.daysOpen * this.ticketPrice;
};

Park.prototype.getDietCounts = function (){
  return this.dinosaurs.reduce(function(res, dinosaur){
    if(dinosaur.diet in res){
      res[dinosaur.diet]++;
    } else {
      res[dinosaur.diet] = 1;
    }
    return res;
  }, {});
};

module.exports = Park;
