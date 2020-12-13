//Edit Table Name////////////////
const tableName = 'customers';
////////////////////////////////
// const fs = require('fs');
const connection = require('../helpers/dbconnect.helper');

// function decodeBase64Image(dataString) {
// 	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
// 	  response = {};

// 	if (matches.length !== 3) {
// 	  return new Error('Invalid input string');
// 	}

// 	response.type = matches[1];
// 	response.data = new Buffer.from(matches[2], 'base64');

// 	return response;
//   }
exports.add = (param) => {
	

	console.log("trying...");
	// if(param.image){
	//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	//     var decodedImg = decodeBase64Image(param.image);
	//     var imageBuffer = decodedImg.data;
	// 	var fileName =  param.image_title;
	// 	var filePath = "C:/creations/htdocs/admincfw/public/uploads/"+fileName;
	// 	var uploadPath = "/uploads/"+fileName;
	//     var startup_image = imageBuffer;
	//    console.log(startup_image);
	//    // Use the mv() method to place the file somewhere on your server
	// //    startup_image.mv('app/uploads/' + fileName, function(err) {
	// //      if(err){
	// //        console.log(err);
	// //      }else{
	//     fs.writeFile(filePath, startup_image, function(err) {
	// 		if(err) {
	// 			return console.log(err);
	// 		}
	// 		console.log("The file was saved at : "+filePath);
			
	// 	}); 
	// }
	

	return new Promise( async (resolve, reject) => {

		
		//Edit Table fields to add///////
		var tableFields;
	
	
		tableFields = {
			customer_name: param.customer_name,
			contact_number: param.contact_number,
			address: param.address,
			creation_date: param.creation_date,
			social_link: param.social_link,
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
	// 	var filePath;
	// 	connection.query(`update `+tableName+` set ? where id = `+param.id, tableFields, (error, result) => {
	// 		if(error){
				
	// 		} else {
	// 			filePath=result;
	// 		}
	// 	});
	// 	if(param.image){
	// 	  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	// 	  var decodedImg = decodeBase64Image(param.image);
	// 	  var imageBuffer = decodedImg.data;
	// 	  var fileName =  param.image_title;
	// 	  filePath = "C:/creations/htdocs/admincfw/public/uploads/"+fileName;
	// 	  var uploadPath = "/uploads/"+fileName;
	// 	  var startup_image = imageBuffer;
	// 	 console.log(startup_image);
	// 	 // Use the mv() method to place the file somewhere on your server
	//   //    startup_image.mv('app/uploads/' + fileName, function(err) {
	//   //      if(err){
	//   //        console.log(err);
	//   //      }else{
	// 	  fs.writeFile(filePath, startup_image, function(err) {
	// 		  if(err) {
	// 			  return console.log(err);
	// 		  }
	// 		  console.log("The file was saved at : "+filePath);
			  
	// 	  }); 
	// 	}
	// 	//Edit table fields to update/////////
	// 	var tableFields;
	// if (param.image){
		tableFields = {
			id: param.id,
			customer_name: param.customer_name,
			contact_number: param.contact_number,
			address: param.address,
			creation_date: param.creation_date,
			social_link: param.social_link,
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
	if(reqParam.customer_name || reqParam.q || reqParam.date_start || reqParam.date_end){
		console.log('id present');
		console.log(reqParam);
		var queryBuilder = `select * from `+tableName+` where `;

		//Customer ID Filter
		if(reqParam.customer_name){
			if(!reqParam.date_start && !reqParam.date_end && !reqParam.q){
				queryBuilder += `id in (`+[reqParam.customer_name]+`) `;
			}else{
				queryBuilder += `id in (`+[reqParam.customer_name]+`) AND `;
			}
		}


		//Date Start Filter
		if(reqParam.date_start){
			if(!reqParam.customer_name && !reqParam.date_end && !reqParam.q && !reqParam.purchase_id){
				queryBuilder += `creation_date >= '`+[reqParam.date_start]+`' `;
			}else
			if(reqParam.customer_name && !reqParam.date_end && !reqParam.q) {		
				queryBuilder += `creation_date >= '`+[reqParam.date_start]+`' `;
			}else{
				queryBuilder += `creation_date >= '`+[reqParam.date_start]+`' AND `;
			}
		}

		//Date End Filter
		if(reqParam.date_end){
			if(!reqParam.customer_name && !reqParam.date_start && !reqParam.q && !reqParam.q){
				queryBuilder += `creation_date <= '`+[reqParam.date_end]+`' `;
			}else
			if((reqParam.customer_name || reqParam.date_start || reqParam.purchase_id) && !reqParam.q) {		
				queryBuilder += `creation_date <= '`+[reqParam.date_end]+`' `;
			}else{
				queryBuilder += `creation_date <= '`+[reqParam.date_end]+`' AND `;
			}
		}
	
		
		//Query Filter 
		if(reqParam.q){	
			queryBuilder += `(customer_name LIKE '%`+reqParam.q+`%' OR 
			contact_number LIKE '%`+reqParam.q+`%' OR 
			address LIKE '%`+reqParam.q+`%' OR 
			creation_date LIKE '%`+reqParam.q+`%' OR
			social_link LIKE '%`+reqParam.q+`%') 
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
			connection.query(`select * from `+tableName+` where id in (?)`, [reqParam.id], function (error, result) {
				if (error) {
					return reject(error);
				} else {
					
					
					return resolve(result);
				}
			});
		});
	}else{
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` where id in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.id],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}
}