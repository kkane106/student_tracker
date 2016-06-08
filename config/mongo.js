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