//Edit Table Name////////////////
const tableName = 'vendors';
////////////////////////////////

const connection = require('../helpers/dbconnect.helper');

exports.add = (param) => {
	return new Promise( async (resolve, reject) => {
		//Edit Table fields to add///////
		let tableFields = {
			vendor_name: param.vendor_name,
			shop_name: param.shop_name,
			contact_number: param.contact_number,
			creation_date: param.creation_date,
			address: param.address,
			coordinates: param.coordinates,
			category: param.category,
			product_categories: param.product_categories,
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
		//Edit table fields to update/////////
		let tableFields = {
			id: param.id,
			vendor_name: param.vendor_name,
			shop_name: param.shop_name,
			contact_number: param.contact_number,
			creation_date: param.creation_date,
			address: param.address,
			coordinates: param.coordinates,
			category: param.category,
			product_categories: param.product_categories,
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
	if(reqParam.vendor_name || reqParam.q || reqParam.category){
		console.log('id present');

		if(reqParam.q && reqParam.vendor_name && !reqParam.category){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where vendor_name in (?) AND 
					(shop_name LIKE '%`+reqParam.q+`%' OR 
					contact_number LIKE '%`+reqParam.q+`%' OR 
					address LIKE '%`+reqParam.q+`%' OR 
					category LIKE '%`+reqParam.q+`%')
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.vendor_name],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}else if(!reqParam.q && reqParam.vendor_name && !reqParam.category){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where vendor_name in (?) 
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.vendor_name],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}

		if(reqParam.q && reqParam.category && !reqParam.vendor_name){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where category in (?) AND 
					(shop_name LIKE '%`+reqParam.q+`%' OR 
					contact_number LIKE '%`+reqParam.q+`%' OR 
					address LIKE '%`+reqParam.q+`%' OR 
					category LIKE '%`+reqParam.q+`%')
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}else if(!reqParam.q && reqParam.category && !reqParam.vendor_name){
		
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where category in (?) 
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}

		if(reqParam.q && reqParam.category && reqParam.vendor_name){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where (category in (?) AND vendor_name in (?)) AND
					(shop_name LIKE '%`+reqParam.q+`%' OR 
					contact_number LIKE '%`+reqParam.q+`%' OR 
					address LIKE '%`+reqParam.q+`%' OR 
					category LIKE '%`+reqParam.q+`%')
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],[reqParam.vendor_name],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}else if(!reqParam.q && reqParam.category && reqParam.vendor_name){
			console.log(reqParam.category);
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where category in (?) AND vendor_name in (?) 
					ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],[reqParam.vendor_name],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		} 		
		else{
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where (
					vendor_name LIKE '%`+reqParam.q+`%' OR 
					shop_name LIKE '%`+reqParam.q+`%' OR 
					contact_number LIKE '%`+reqParam.q+`%' OR 
					address LIKE '%`+reqParam.q+`%' OR 
					category LIKE '%`+reqParam.q+`%') ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`,[parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}
		/////////////////////////////////////////////////////////END OF EDIT FILTERS //////////////////////////////////
	}else{
		
		
		console.log('id absent');
		console.log(reqParam);
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