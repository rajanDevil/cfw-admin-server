//Edit Table Name////////////////
const tableName = 'products';
////////////////////////////////
const fs = require('fs');
const connection = require('../helpers/dbconnect.helper');

function decodeBase64Image(dataString) {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
	  response = {};

	if (matches.length !== 3) {
	  return new Error('Invalid input string');
	}

	response.type = matches[1];
	response.data = new Buffer.from(matches[2], 'base64');

	return response;
  }
exports.add = (param) => {
	

	console.log("trying...");
	if(param.image){
	    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	    var decodedImg = decodeBase64Image(param.image);
	    var imageBuffer = decodedImg.data;
		var fileName =  param.image_title;
		var filePath = "../../../"+fileName;
		var uploadPath = "/uploads/"+fileName;
	    var startup_image = imageBuffer;
	   console.log(startup_image);
	   // Use the mv() method to place the file somewhere on your server
	//    startup_image.mv('app/uploads/' + fileName, function(err) {
	//      if(err){
	//        console.log(err);
	//      }else{
	    fs.writeFile(filePath, startup_image, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved at : "+filePath);
			
		}); 
	}
	

	return new Promise( async (resolve, reject) => {

		
		//Edit Table fields to add///////
		var tableFields;
	if (param.image){
		tableFields = {
			vendor_id: param.vendor_id,
			purchase_id: param.purchase_id,
			product_name: param.product_name,
			price: param.price,
			description: param.description,
			purchased_qty: param.purchased_qty,
			image: uploadPath,
			stock: param.stock,
			variant: param.variant,
			created_at: param.created_at
		}
	}else{
		tableFields = {
			vendor_id: param.vendor_id,
			purchase_id: param.purchase_id,
			product_name: param.product_name,
			price: param.price,
			description: param.description,
			purchased_qty: param.purchased_qty,
			stock: param.stock,
			variant: param.variant,
			created_at: param.created_at
		}
	}
		////////////////////////////////////	

		connection.query(`insert into `+tableName+` set ?`, tableFields, (error, insert) => {
			if(error){
				return reject(error);
			} else {
				return resolve(insert);
			}
		});
	});
}

exports.update = (param) => {
	return new Promise( async (resolve, reject) => {
		var filePath;
		connection.query(`update `+tableName+` set ? where id = `+param.id, tableFields, (error, result) => {
			if(error){
				
			} else {
				filePath=result;
			}
		});
		if(param.image){
		  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		  var decodedImg = decodeBase64Image(param.image);
		  var imageBuffer = decodedImg.data;
		  var fileName =  param.image_title;
		  filePath = "C:/creations/htdocs/admincfw/public/uploads/"+fileName;
		  var uploadPath = "/uploads/"+fileName;
		  var startup_image = imageBuffer;
		 console.log(startup_image);
		 // Use the mv() method to place the file somewhere on your server
	  //    startup_image.mv('app/uploads/' + fileName, function(err) {
	  //      if(err){
	  //        console.log(err);
	  //      }else{
		  fs.writeFile(filePath, startup_image, function(err) {
			  if(err) {
				  return console.log(err);
			  }
			  console.log("The file was saved at : "+filePath);
			  
		  }); 
		}
		//Edit table fields to update/////////
		var tableFields;
	if (param.image){
		tableFields = {
			id: param.id,
			vendor_id: param.vendor_id,
			purchase_id: param.purchase_id,
			product_name: param.product_name,
			price: param.price,
			description: param.description,
			purchased_qty: param.purchased_qty,
			image: uploadPath,
			stock: param.stock,
			variant: param.variant,
			created_at: param.created_at
		}
	}else{
		tableFields = {
			id: param.id,
			vendor_id: param.vendor_id,
			purchase_id: param.purchase_id,
			product_name: param.product_name,
			price: param.price,
			description: param.description,
			purchased_qty: param.purchased_qty,
			stock: param.stock,
			variant: param.variant,
			created_at: param.created_at
		}
	}
		//////////////////////////////////////

		connection.query(`update `+tableName+` set ? where id = `+param.id, tableFields, (error, update) => {
			if(error){
				return reject(error);
			} else {
				return resolve(update);
			}
		});
	});
}

exports.list = (reqParam) => {

	///EDIT FILTERS IN THIS BLOCK//////////////////////////////////////
	if(reqParam.vendor_id || reqParam.q || reqParam.date_start || reqParam.date_end || reqParam.purchase_id){
		console.log('id present');
		console.log(reqParam);
		var queryBuilder = `select * from `+tableName+` where `;

		//Vendor ID Filter
		if(reqParam.vendor_id){
			if(!reqParam.date_start && !reqParam.date_end && !reqParam.q && !reqParam.purchase_id){
				queryBuilder += `vendor_id in (`+[reqParam.vendor_id]+`) `;
			}else{
				queryBuilder += `vendor_id in (`+[reqParam.vendor_id]+`) AND `;
			}
		}

		//Vendor ID Filter
		if(reqParam.purchase_id){
			if(!reqParam.date_start && !reqParam.date_end && !reqParam.q ){
				queryBuilder += `purchase_id in (`+[reqParam.purchase_id]+`) `;
			}else{
				queryBuilder += `purchase_id in (`+[reqParam.purchase_id]+`) AND `;
			}
		}

		//Date Start Filter
		if(reqParam.date_start){
			if(!reqParam.vendor_id && !reqParam.date_end && !reqParam.q && !reqParam.purchase_id){
				queryBuilder += `created_at >= '`+[reqParam.date_start]+`' `;
			}else
			if(reqParam.vendor_id && !reqParam.date_end && !reqParam.q) {		
				queryBuilder += `created_at >= '`+[reqParam.date_start]+`' `;
			}else{
				queryBuilder += `created_at >= '`+[reqParam.date_start]+`' AND `;
			}
		}

		//Date End Filter
		if(reqParam.date_end){
			if(!reqParam.vendor_id && !reqParam.date_start && !reqParam.q && !reqParam.q){
				queryBuilder += `created_at <= '`+[reqParam.date_end]+`' `;
			}else
			if((reqParam.vendor_id || reqParam.date_start || reqParam.purchase_id) && !reqParam.q) {		
				queryBuilder += `created_at <= '`+[reqParam.date_end]+`' `;
			}else{
				queryBuilder += `created_at <= '`+[reqParam.date_end]+`' AND `;
			}
		}
	
		
		//Query Filter 
		if(reqParam.q){	
			queryBuilder += `(product_name LIKE '%`+reqParam.q+`%' OR 
			price LIKE '%`+reqParam.q+`%' OR 
			description LIKE '%`+reqParam.q+`%' OR 
			stock LIKE '%`+reqParam.q+`%' OR
			variant LIKE '%`+reqParam.q+`%') 
			`;
		}
		console.log(queryBuilder);
		return new Promise( async (resolve, reject) => {
			connection.query(queryBuilder+` ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
				if (error) {
					return reject(error);
				} else {
					return resolve(result);
				}
			});
		});

		/////////////////////////////////////////////////////////END OF EDIT FILTERS //////////////////////////////////
	}else{
		console.log('id absent');
		return new Promise( async (resolve, reject) => {
			connection.query(`select * from `+tableName+` ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result) {
				if (error) {
					return reject(error);
				} else {
					
					
					return resolve(result);
				}
			});
		});
	}
	
}

exports.delete = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`delete from `+tableName+` where id = ?`, [reqParam], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}

exports.deleteMany = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`delete from `+tableName+` where id in (?)`, [reqParam.id], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}

exports.getById = (reqParam) => {
	return new Promise((resolve, reject) => {
		connection.query(`select * from `+tableName+` where id = ?`,[reqParam], function(error, result, fields){
			if(error){
				return reject(error);
			}else{
				return resolve(result[0]);
			}
		});
	});
}

exports.getLatest = () => {
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` order by id desc limit 1`, function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}

exports.getMany = (reqParam) => {

	if(!reqParam._sort || !reqParam._order || !reqParam._start || !reqParam._skip){
		console.log('reqparam present id');
		return new Promise( async (resolve, reject) => {
			connection.query(`select * from `+tableName+` where purchase_id in (?)`, [reqParam.id], function (error, result) {
				if (error) {
					return reject(error);
				} else {
					
					
					return resolve(result);
				}
			});
		});
	}else{
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` where purchase_id in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.id],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}
}