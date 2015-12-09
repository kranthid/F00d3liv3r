var Recipe = require('../models/recipe');


exports.createRecipe = function(req,res){
	  var foodItem = new Recipe();
	  foodItem.category = req.body.category;
	  foodItem.name = req.body.name;
	  foodItem.price = req.body.price;
	  foodItem.imageUrl =req.body.imageUrl;
	  foodItem.status = req.body.status;
	  foodItem.save(function(err){
	  	if(err){
	  			res.send("Error while saving data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Food item was added successfully"});
	  	}
	  })
}

exports.getRecipeById = function(req,res){
	  var foodItemId = req.params.id;
	  Recipe.findById(foodItemId,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({item:data});
	  	}
	  });
}

exports.getRecipeByCategory = function(req,res){
	var category = req.params.category;
	Recipe.find(category,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({all_items:data});
	  	}
	});
}
exports.deleteRecipeById = function(req,res){
	var id = req.params.id;
	console.log("Id is >>>",id);
	Recipe.remove({_id:id},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Deletion was successful"});
	  	}
	});

}

exports.updateRecipeById = function(req,res){
	var id = req.params.id;
	console.log("Id is >>>",id);
	var update_object = {
		"imageUrl": req.body.imageUrl,
		"price": req.body.price,
		"name": req.body.name,
		"category": req.body.category,
		"status":req.body.status
	};
	console.log("updateing data >>>",update_object);
	Recipe.update({_id:id},update_object,{upsert:true},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({updated_item:data});
	  	}		
	})

}