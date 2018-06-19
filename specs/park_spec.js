const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  let dinosaur;
  let dinosaurs;
  let park;

  beforeEach(function () {
    dinosaurs = [
      new Dinosaur('t-rex', 'carnivore', 50),
      new Dinosaur('Iguanodon', 'herbivore', 10)
    ];
    dinosaur = new Dinosaur("Oviraptor", "omnivore", 55);
    park = new Park("Jurrasic", 40, dinosaurs);
  })

  it('should have a name', function (){
    assert.strictEqual(park.name, "Jurrasic");
  });

  it('should have a ticket price', function (){
    assert.strictEqual(park.ticketPrice, 40);
  });

  it('should have a collection of dinosaurs', function (){
    assert.deepStrictEqual(park.dinosaurs, dinosaurs);
  });

  it('should have number of days open', function (){
    assert.deepStrictEqual(park.daysOpen, 365);
  });

  it('should be able to add a dinosaur to its collection', function (){
    park.addDinosaur(dinosaur);
    dinosaurs.push(dinosaur);
    assert.deepStrictEqual(park.dinosaurs, dinosaurs);
  });

  it('should be able to remove a dinosaur from its collection', function (){
    park.addDinosaur(dinosaur);
    park.removeDinosaur(dinosaur);
    assert.deepStrictEqual(park.dinosaurs, dinosaurs);
  });

  it('should be able to find the dinosaur that attracts the most visitors', function (){
    park.addDinosaur(dinosaur);
    assert.deepStrictEqual(park.getHighestAttraction(), dinosaur);
  });

  it('should be able to find all dinosaurs of a particular species', function (){
    park.addDinosaur(dinosaur);
    const dinosaur2 = new Dinosaur("Oviraptor", "omnivore", 20);
    park.addDinosaur(dinosaur2);
    assert.deepStrictEqual(park.getBySpecies("Oviraptor"), [dinosaur, dinosaur2]);
  });

  it('should be able to remove all dinosaurs of a particular species', function (){
    park.addDinosaur(dinosaur);
    const dinosaur2 = new Dinosaur("Oviraptor", "omnivore", 20);
    park.addDinosaur(dinosaur2);
    park.removeBySpecies("Oviraptor")
    assert.deepStrictEqual(park.dinosaurs, dinosaurs);
  });

  it('should be able to calculate visitors per day', function() {
    assert.strictEqual(park.getVisitorsByDay(), 60);
  });

  it('should be able to calculate visitors per year', function() {
    assert.strictEqual(park.getVisitorsByYear(), 60 * 365);
  });

  it('should be able to calculate revenue for a year', function() {
    assert.strictEqual(park.getRevenueByYear(), 60 * 365 * 40);
  })

  it('should be able to provide a count of each diet type', function() {
    park.addDinosaur(dinosaur);
    const dinosaur2 = new Dinosaur("Oviraptor", "omnivore", 20);
    park.addDinosaur(dinosaur2);
    const expected = {
      omnivore: 2,
      herbivore: 1,
      carnivore: 1
    };
    assert.deepStrictEqual(park.getDietCounts(), expected);
  });

});
