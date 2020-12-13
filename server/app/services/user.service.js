const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../../config/jwt.config');
const connection = require('../helpers/dbconnect.helper');

exports.register = (userParam) => {
	return new Promise( async (resolve, reject) => {
		let today = new Date();
		let passwordHash = bcrypt.hashSync(userParam.password, 10);
		let users = {
			name: userParam.name,
			email: userParam.email,
			password : passwordHash
		}
		connection.query(`insert into users set ?`, users, (error, userInsert) => {
			if(error){
				return reject(error);
			} else {
				return resolve(userInsert);
			}
		});
	});
}

exports.getUserByEmail = (email) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`select id,name,email from users where email = ?`, [email], function (err, userResult, fields) {
			if (err) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}

exports.login = ({ email, password }) => {
	return new Promise(async (resolve, reject) => {
		connection.query(`select id,name,email,password from users where email = ?`, [email], function (err, userResult, fields) {
			// console.log(fields);
			if (err) {
				return reject(err);
			} else {
				if (userResult && bcrypt.compareSync(password, userResult[0].password)) {
					let token = jwt.sign({ sub: userResult[0].id }, jwtConfig.secret);
					delete userResult[0].password;
					return resolve({ token, userResult: userResult[0] });
				}else{
					return resolve(false);
				}
			}
		});;
	});
}

exports.getById = async (id) => {
	return new Promise((resolve, reject) => {
		connection.query(`select * from users where id = ?`,[id], function(error, userResult, fields){
			if(error){
				return reject(error);
			}else{
				return resolve(userResult[0]);
			}
		});
	});
}

exports.list = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from users ORDER BY `+reqParam._sort+` `+reqParam._order+` LIMIT ?,?`, [parseInt(reqParam._start), parseInt(reqParam._skip)], function (error, userResult) {
			if (error) {
				return reject(error);
			} else {
				
				return resolve(userResult);
			}
		});
	});
}

exports.update = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		let user = {
			name: reqParam.name,
			email: reqParam.email,
			username: reqParam.username
		}
		console.log(user);
		connection.query(`update users set ? where id = `+reqParam.id, user, (error, userUpdate) => {
			if(error){
				return reject(error);
			} else {
				return resolve(userUpdate);
			}
		});
	});
}

exports.deleteMany = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`delete from users where id in (?)`, [reqParam.id], function (error, userResult, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}

exports.getMany = (reqParam) => {
	console.log('Im here');
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from users where id in (?)`, [reqParam.id], function (error, userResult, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}

exports.getLatest = () => {
	return new Promise( async (resolve, reject) => {
		connection.query(`select * from users order by id desc limit 1`, function (error, userResult, fields) {
			connection.end();
			if (error) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}


exports.delete = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`delete from users where id = ?`, [reqParam], function (error, userResult, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}

exports.deleteMany = (reqParam) => {
	return new Promise( async (resolve, reject) => {
		connection.query(`delete from users where id in (?)`, [reqParam.id], function (error, userResult, fields) {
			if (error) {
				return reject(error);
			} else {
				return resolve(userResult);
			}
		});
	});
}