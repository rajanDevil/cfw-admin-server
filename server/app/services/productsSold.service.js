//Edit Table Name////////////////
const tableName = 'products_sold';
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
			sale_id: param.sale_id,
			customer_id: param.customer_id,
			product_id: param.product_id,
			qty: param.qty,
			variant: param.variant,
			rate: param.rate,
			sold_at: param.sold_at,
		}
		////////////////////////////////////
		var adjustedStock;
		connection.query(`select * from products where id = `+param.product_id+` Limit 1`,  (error, result) => {
			if(error){
				
			} else {
				
				var originalQty =  parseInt(result[0].stock);
				adjustedStock = originalQty-parseInt(param.qty);
			}
		});
		
		connection.query(`insert into `+tableName+` set ?`, tableFields, (error, insert) => {
			if(error){
				return reject(error);
			} else {
				connection.query(`update products set stock=`+adjustedStock+` where id = `+param.product_id, (error, update) => {
					if(error){
						
					} else {
						
					}
				});
				return resolve(insert);
			}
		});
	});
}

exports.update = (param) => {
	return new Promise( async (resolve, reject) => {
		
		tableFields = {
			id: param.id,
			sale_id: param.sale_id,
			customer_id: param.customer_id,
			product_id: param.product_id,
			qty: param.qty,
			variant: param.variant,
			rate: param.rate,
			sold_at: param.sold_at,
		}
	
		//////////////////////////////////////
		var adjustedStock;
		var adjustQuantity;
		var toUpdate;
		var updateQuantity = parseInt(param.qty);
		connection.query(`select * from products_sold where id = `+param.id+` Limit 1`,  (error, result) => {
			if(error){
				
			} else {
				adjustQuantity = parseInt(result[0].qty);
			}
		});
		connection.query(`select * from products where id = `+param.product_id+` Limit 1`,  (error, result) => {
			if(error){
				
			} else {
				if(adjustQuantity<updateQuantity){
					toUpdate = updateQuantity-adjustQuantity;
					adjustedStock = parseInt(result[0].stock)-toUpdate;
				}else if(adjustQuantity>updateQuantity){
					toUpdate = adjustQuantity-updateQuantity;
					adjustedStock = parseInt(result[0].stock)+toUpdate;
				}else{
					adjustedStock = result[0].stock;
				}
				console.log("Stocks");
				console.log(result[0].stock);
				console.log("Adjusts");
				console.log(adjustedStock);
			}
		});
		
		connection.query(`update `+tableName+` set ? where id = `+param.id, tableFields, (error, update) => {
			if(error){
				return reject(error);
			} else {
				connection.query(`update products set stock=`+adjustedStock+` where id = `+param.product_id, (error, update) => {
					if(error){
						
					} else {
						
					}
				});
				return resolve(update);
			}
		});
	});
}

exports.list = (reqParam) => {

	///EDIT FILTERS IN THIS BLOCK//////////////////////////////////////
	if(reqParam.customer_id || reqParam.q || reqParam.date_start || reqParam.date_end || reqParam.sale_id || reqParam.product_id){
		console.log('id present');
		console.log(reqParam);
		var queryBuilder = `select * from `+tableName+` where `;

		//Customer ID Filter
		if(reqParam.customer_id){
			if(!reqParam.date_start && !reqParam.date_end && !reqParam.q && !reqParam.product_id && !reqParam.sale_id) {
				queryBuilder += `customer_id in (`+[reqParam.customer_id]+`) `;
			}else{
				queryBuilder += `customer_id in (`+[reqParam.customer_id]+`) AND `;
			}
		}

		if(reqParam.sale_id){
			if(reqParam.customer_id && !reqParam.date_end && !reqParam.q && !reqParam.date_start && !reqParam.product_id){
				queryBuilder += `sale_id in (`+[reqParam.sale_id]+`) `;
			}else if(!reqParam.customer_id && !reqParam.product_id && !reqParam.date_end && !reqParam.q && !reqParam.date_start){
				queryBuilder += `sale_id in (`+[reqParam.sale_id]+`) `;
			}else{
				queryBuilder += `sale_id in (`+[reqParam.sale_id]+`) AND `;
			}
		}

		if(reqParam.product_id){
			if((reqParam.sale_id || reqParam.customer_id) && !reqParam.date_end && !reqParam.q && !reqParam.date_start){
				queryBuilder += `product_id in (`+[reqParam.product_id]+`) `;
			}else if(!reqParam.sale_id && !reqParam.customer_id && !reqParam.date_end && !reqParam.q && !reqParam.date_start){
				queryBuilder += `product_id in (`+[reqParam.product_id]+`) `;
			}else{
				queryBuilder += `product_id in (`+[reqParam.product_id]+`) AND `;
			}
		}

		//Date Start Filter
		if(reqParam.date_start){
			if((reqParam.sale_id || reqParam.customer_id || reqParam.product_id) && !reqParam.date_end && !reqParam.q){
				queryBuilder += `sold_at >= '`+[reqParam.date_start]+`' `;
			}else
			if(!reqParam.sale_id && !reqParam.customer_id && !reqParam.product_id && !reqParam.date_end && !reqParam.q) {		
				queryBuilder += `sold_at >= '`+[reqParam.date_start]+`' `;
			}else{
				queryBuilder += `sold_at >= '`+[reqParam.date_start]+`' AND `;
			}
		}

		//Date End Filter
		if(reqParam.date_end){
			if((reqParam.sale_id || reqParam.customer_id || reqParam.product_id || reqParam.date_start) && !reqParam.q){
				queryBuilder += `sold_at <= '`+[reqParam.date_end]+`' `;
			}else
			if(!reqParam.sale_id && !reqParam.customer_id && !reqParam.product_id && !reqParam.date_start && !reqParam.q) {		
				queryBuilder += `sold_at <= '`+[reqParam.date_end]+`' `;
			}else{
				queryBuilder += `sold_at <= '`+[reqParam.date_end]+`' AND `;
			}
		}
	
		
		//Query Filter 
		if(reqParam.q){	
			queryBuilder += `(sale_id LIKE '%`+reqParam.q+`%' OR 
			qty LIKE '%`+reqParam.q+`%' OR 
			variant LIKE '%`+reqParam.q+`%' OR 
			sold_at LIKE '%`+reqParam.q+`%' OR
			rate LIKE '%`+reqParam.q+`%') 
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
			connection.query(`select * from `+tableName+` where sale_id in (?)`, [reqParam.id], function (error, result) {
				if (error) {
					return reject(error);
				} else {
					
					
					return resolve(result);
				}
			});
		});
	}else{
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` where sale_id in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.id],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}
}