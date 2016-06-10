var faker = require('faker');
var fs = require('fs');
var MongoDriver = require('mongodb');
var Mongo = MongoDriver.MongoClient;
var ObjectID = MongoDriver.ObjectID;

module.exports.getNextSequence = function(name, db, callback) {
	var collection = db.collection('userCounters');
	collection.findOneAndUpdate(
		{"_id" : name}, 
		{
			$inc : {
				"seq" : 1
			}
		},
		{
			returnOriginal : false,
			upsert : true
		},
		callback);
};

// Seed data method
module.exports.seedData = function() {
	var student = {
		name : faker.name.findName(),
		phone : faker.phone.phoneNumber(),
		email : faker.internet.email(),
		address : {
			street : faker.address.streetAddress(),
			city : faker.address.city(),
			state : faker.address.stateAbbr(),
			country : faker.address.country()
		},
		notes : [{
			date : faker.date.past(),
			text : faker.lorem.sentence()
		}, {
			date : faker.date.past(),
			text : faker.lorem.sentence()
		}],
		va : faker.random.boolean(),
		source : faker.company.companyName(),
		init_contact : faker.date.past(),
		applications : [{
			_id : new ObjectID(),
			status : "active", // or "closed" or "accepted"
			writing_resume : {
				date : faker.date.past(),
				is_ok : faker.random.boolean(),
				notes : [{
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}, {
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}],
			},
			exam : {
				date : faker.date.past(),
				is_ok : faker.random.boolean(),
				notes : [{
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}, {
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}],
				score : faker.random.number()
			},
			interview : {
				date : faker.date.past(),
				is_ok : faker.random.boolean(),
				notes : [{
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}, {
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}],
			},
			logic : {
				date : faker.date.past(),
				is_ok : faker.random.boolean(),
				notes : [{
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}, {
					date : faker.date.past(),
					text : faker.lorem.sentence()
				}],
			},
			drop_out : faker.random.boolean(),
			offer_date : faker.date.past(),
			accept_date : faker.date.past(),
			deposit : {
				date : faker.date.past(),
				hasPaid : faker.random.boolean()
			}
		}]
	};

	return student;
};

module.exports.insertSeedData = function() {
	var file = '/Users/Kane/Desktop/studentapp/seed.json';
	var obj = fs.readFile(file, 'utf8', function(err,data){
		console.error(err);
		var students = JSON.parse(data);
		Mongo.connect('mongodb://localhost:27017/studentTracker', function(err,db){
			var coll = db.collection('students');
			coll.insertMany(students, function(err,res){
				console.error(err);
				console.log(res);
				console.log('finished seeding data');
				db.close();
			})
		});
	});
};