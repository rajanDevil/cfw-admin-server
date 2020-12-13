//Edit Table Name////////////////
const tableName = 'sales';
////////////////////////////////

const connection = require('../helpers/dbconnect.helper');

exports.add = (param) => {
	return new Promise( async (resolve, reject) => {
	
		//Edit Table fields to add///////
		let tableFields = {
			customer_id: param.customer_id,
			sale_date: param.sale_date,
			amount: param.amount,
			mode: param.mode,
			amount_paid: param.amount_paid,
			remaining_due: param.remaining_due
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
			customer_id: param.customer_id,
			sale_date: param.sale_date,
			amount: param.amount,
			mode: param.mode,
			amount_paid: param.amount_paid,
			remaining_due: param.remaining_due
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
	if(reqParam.customer_id || reqParam.q || reqParam.date_start || reqParam.date_end){
		console.log('id present');
		console.log(reqParam);
		
		var queryBuilder = `select * from `+tableName+` where `;

		//customer ID Filter
		if(reqParam.customer_id){
			if(!reqParam.date_start && !reqParam.date_end && !reqParam.q){
				queryBuilder += `customer_id in (`+[reqParam.customer_id]+`) `;
			}else{
				queryBuilder += `customer_id in (`+[reqParam.customer_id]+`) AND `;
			}
		}

		//Date Start Filter
		if(reqParam.date_start){
			if(!reqParam.customer_id && !reqParam.date_end && !reqParam.q){
				queryBuilder += `sale_date >= '`+[reqParam.date_start]+`' `;
			}else
			if(reqParam.customer_id && !reqParam.date_end && !reqParam.q) {		
				queryBuilder += `sale_date >= '`+[reqParam.date_start]+`' `;
			}else{
				queryBuilder += `sale_date >= '`+[reqParam.date_start]+`' AND `;
			}
		}

		//Date End Filter
		if(reqParam.date_end){
			if(!reqParam.customer_id && !reqParam.date_start && !reqParam.q){
				queryBuilder += `sale_date <= '`+[reqParam.date_end]+`' `;
			}else
			if((reqParam.customer_id || reqParam.date_start) && !reqParam.q) {		
				queryBuilder += `sale_date <= '`+[reqParam.date_end]+`' `;
			}else{
				queryBuilder += `sale_date <= '`+[reqParam.date_end]+`' AND `;
			}
		}

		//Query Filter 
		if(reqParam.q){
			queryBuilder += `(mode LIKE '%`+reqParam.q+`%' OR 
			cost LIKE '%`+reqParam.q+`%' OR 
			amount_paid LIKE '%`+reqParam.q+`%' OR 
			remaining_due LIKE '%`+reqParam.q+`%') 
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
			connection.query(`select * from `+tableName+` where customer_id in (?)`, [reqParam.id], function (error, result) {
				if (error) {
					return reject(error);
				} else {
					
					
					return resolve(result);
				}
			});
		});
	}else{
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` where customer_id in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.id],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}
}