//Edit Table Name////////////////
const tableName = 'product_categories';
////////////////////////////////

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../../config/jwt.config');
const connection = require('../helpers/dbconnect.helper');
const helpers = require('../helpers/helpers');
const multer = require('multer');
const path = require('path');


var fs = require('fs');


exports.add = (param) => {
	
	
	return new Promise( async (resolve, reject) => {
		//Edit Table fields to add///////
		let tableFields = {
			category: param.category,
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
			category: param.category,
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
	if(!reqParam._sort || !reqParam._order || !reqParam._start || !reqParam._skip){
		if(reqParam.category){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where id in (?) AND category LIKE '%`+reqParam.q+`%'`, [reqParam.category], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}else{
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where category LIKE '%`+reqParam.q+`%'`, function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}
	}else{
	if(reqParam.category || reqParam.q){
		console.log('id present');

		if(reqParam.q && reqParam.category){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where id in (?) AND category LIKE '%`+reqParam.q+`%' ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
					if (error) {
						return reject(error);
					} else {
						return resolve(result);
					}
				});
			});
		}
		else if(!reqParam.q && reqParam.category){
			return new Promise( async (resolve, reject) => {
				connection.query(`select * from `+tableName+` where id in (?) ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [[reqParam.category],parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
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
				connection.query(`select * from `+tableName+` where category LIKE '%`+reqParam.q+`%' ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`,[parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, result, fields) {
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
		return new Promise( async (resolve, reject) => {
			connection.query(`select * from `+tableName+` where id in (?)`, [reqParam.id], function (error, result, fields) {
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