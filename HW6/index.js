var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

app.use("/findToy", (req, res) => {
	var id = req.query.id;

	if (!id) {
		res.json({});
	} else {
		Toy.findOne({ id: id }, (err, toy) => {
			if (err) {
				res.type("html").status(500);
				res.send("Error:" + err);
			}
			else if (!toy) res.json({})
			else res.json(toy);
		})
	}
});

app.use("/findAnimals", (req, res) => {
	var query = {},
			species = req.query.species,
			trait = req.query.trait,
			gender = req.query.gender;

	if (species) query.species = species;
	// if (trait) query.traits = { $in: [trait] };
	if (trait) query.traits = trait;
	if (gender) query.gender = gender;

	if (!species && !trait && !gender) {
		res.json({});
	} else {
		Animal.find(query, (err, animals) => {
			if (err) {
				res.type("html").status(500);
				res.send("Error" + err);
			} else if (animals.length == 0) {
				res.json({});
			} else {
				var results = animals.map(animal => ({
					name: animal.name,
					species: animal.species,
					breed: animal.breed,
					gender: animal.gender,
					age: animal.age
				}));
				res.json(results);
			}
		})
	}
});

app.use("/animalsYoungerThan", (req, res) => {
	var age = Number(req.query.age);

	if (!age) {
		res.json({});
	} else {
		Animal.find({ age: { $lt: age } }, (err, animals) => {
			if (err) {
				res.type("html").status(500);
				res.send("Error" + err);
			} else if (animals.length == 0) {
				res.json({ count: 0 });
			} else {
				var names = animals.map(animal => animal.name);
				res.json({ count: names.length, names })
			}
		})
	}
});

app.use("/calculatePrice", (req, res) => {
	var ids = req.query.id,
			qtys = req.query.qty;

	if ((!ids && !qtys) || (ids.length != qtys.length)) {
		res.json({});
	} else {

		var order = {};
		for (var i = 0; i < ids.length; i++) {
			var id = ids[i], qty = Number(qtys[i]);
			if (qty && qty >= 1) {
				if ( !(id in order) ) order[id] = qty
				else order[id] += qty;
			}
		}

		var query = { id: { $in: Object.keys(order) } },
				results = { totalPrice: 0, items: [] };
		Toy.find(query, (err, toys) => {
			if (err) {
				res.type("html").status(500);
				res.send("Error" + err);
			} else if (toys.length != 0) {
				results.items = toys.map(toy => ({
					item: toy.id,
					qty: order[toy.id],
					subtotal: toy.price * order[toy.id]
				}))
				results.totalPrice = results.items
															.map(item => item.subtotal)
															.reduce((a, b) => a + b);
			}
			res.json(results);
		})
	}
});

app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
    });


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });



// Please do not delete the following line; we need it for testing!
module.exports = app;
