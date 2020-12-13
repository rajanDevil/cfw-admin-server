const userService = require('../services/user.service');
const connection = require('../helpers/dbconnect.helper');

exports.register = async (req, res,next) => {
	let userByEmail,userResult;
	try {
		if(req.body.email){
			userByEmail = await userService.getUserByEmail(req.body.email);
		}else{
			userByEmail = await userService.getUserByEmail(req.query.email);
		}
		if(userByEmail.length > 0){
			return res.json({
				status: true,
				message: `User already exist, please login`,
				result: null
			});
		}
		if(req.body.email){
			userResult = await userService.register(req.body);
		}else{
			userResult = await userService.register(req.query);
		}
		let userLatest = await userService.getLatest();
		if(userResult.affectedRows > 0){
			return res.json({
				status: true,
				message: `User register sucessfull`,
				result: userLatest
			});
		} else {
			return res.json({
				status: true,
				message: `Somthing went wrong`,
				result: null
			});
		}
		
	} catch (error) {
		return res.json({
			status: true,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.login = async (req, res, next) => {
	try {
		let user = await userService.login(req.body);
		
		if (user) {
			return res.json({
				status: true,
				message: `Login done`,
				result: user
			});
		} else {
			return res.json({
				status: false,
				message: `Username or password is incorrect`,
				data: null
			});
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.getById = async (req, res, next) => {
	
	try {
		let theId;
		if(req.query.id){
			theId=req.query.id;
		}else{
			theId=req.params.id;
		}
		console.log(theId);
		let user = await userService.getById(theId);
		if(user){
			return res.json({
				status: true,
				message: `User is found`,
				result: user
			});
		} else {
			return res.json({
				status: true,
				message: `User not found for givan id`,
				result: null
			});
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong ${error.message}`,
			result: null
		});
	}
}

exports.list = async (req, res, next) => {
	try {
		// get user id from jwt
		console.log(req.query);
		let userResult = await userService.list(req.query);
		if (userResult.length > 0) {
			let totalItems=0;
			connection.query(`select count(*) as totalRows from users `,
			function (error, totalCounts){
				if(error) {
					return reject(error);
				}else{
					totalItems= totalCounts[0].totalRows;
					
					return res.json({
						status: true,
						"total": totalItems,
						message: `Sucess!`,
						result: userResult,
						
					});
				}
			});
		} else {
			return res.json({
				status: false,
				message: `There is no todo, please create it first`,
				data: null
			});
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.update = async (req, res,next) => {
	let theQuery = req.body;
	console.log(theQuery.title);
	try {
		//get todo id from jwt
		let userResult = await userService.update(theQuery);
		let currentUser = await userService.getById(theQuery.id);
		console.log(currentUser);
		if(userResult.affectedRows > 0){
			return res.json({
				status: true,
				message: `User updated sucessfully`,
				result: currentUser
			});
		} else {
			return res.json({
				status: false,
				message: `Somthing went wrong`,
				result: null
			});
		}
	} catch (error) {
		return res.json({
			status: true,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.getMany = async (req, res, next) => {
	try {
		// get user id from jwt
		console.log("gat here");
		let userResult = await userService.getMany(req.query);
		if (userResult.length > 0) {
			let totalItems=0;
			connection.query(`select count(*) as totalRows from users where id in (?)`, [req.query.id],
			function (error, totalCounts){
				if(error) {
					return reject(error);
				}else{
					totalItems= totalCounts[0].totalRows;
					
					return res.json({
						status: true,
						"total": totalItems,
						message: `Sucess!`,
						result: userResult,
						
					});
				}
			});
	
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.delete = async (req, res, next) => {
	try {
		//get todo id from jwt
		console.log(req.params);
		let deleteUser = await userService.delete(req.params.userId);
		if (deleteUser.affectedRows > 0) {
			return res.json({
				status: true,
				message: `Todo has been deleted`,
				result: null
			});
		} else {
			return res.json({
				status: false,
				message: `You have not access to delete this todo`,
				data: null
			});
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}

exports.deleteMany = async (req, res, next) => {
	try {
		//get todo id from jwt
		console.log(req.query.id);
		let deleteUser = await userService.deleteMany(req.query);
		console.log(deleteUser);
		if (deleteUser.affectedRows > 0) {
			return res.json({
				status: true,
				message: `Todo has been deleted`,
				result: null
			});
		} else {
			return res.json({
				status: false,
				message: `You have not access to delete this todo`,
				data: null
			});
		}
	} catch (error) {
		return res.json({
			status: false,
			message: `Somthing went wrong : ${error.message}`,
			result: null
		});
	}
}
