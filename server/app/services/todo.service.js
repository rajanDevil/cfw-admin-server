//Edit Table Name////////////////
const tableName = 'todos';
////////////////////////////////

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../../config/jwt.config');
const connection = require('../helpers/dbconnect.helper');

exports.add = (param) => {
	return new Promise( async (resolve, reject) => {
		//Edit Table fields to add///////
		let tableFields = {
			title: param.title,
			userId: param.userID,
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
			title: param.title,
			userId: param.userID,
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
	if(reqParam.userID || reqParam.q){
		console.log('id present');

		if(reqParam.q && reqParam.userID){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where userID in (?) AND title LIKE '%`+reqParam.q+`%' ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.userID],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
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
				connection.query(`select * from `+tableName+` where title LIKE '%`+reqParam.q+`%' ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`,[parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
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
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from `+tableName+` where userID in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.id],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(result);
			}
		});
	});
}