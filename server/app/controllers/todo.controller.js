const todoService = require('../services/todo.service');
const connection = require('../helpers/dbconnect.helper');

exports.add = async (req, res,next) => {
	try {
		//get user id from jwt
		let userId = req.user.sub;
		req.body.userId = userId;
		let todoResult = await todoService.add(req.body);
		if(todoResult.affectedRows > 0){
			return res.json({
				status: true,
				message: `Todo added sucessfull`,
				result: null
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

exports.list = async (req, res, next) => {
	try {
		// get user id from jwt
		let userId = req.user.sub;
		req.body.userId = userId;
		let todoResult = await todoService.list(req.query, res);
		
		if (todoResult.length > 0) {
			let totalItems=0;
			connection.query(`select count(*) as totalRows from todos `,
			function (error, totalCounts){
				if(error) {
					return reject(error);
				}else{
					totalItems= totalCounts[0].totalRows;
					
					return res.json({
						status: true,
						"total": totalItems,
						message: `Sucess!`,
						result: todoResult,
						
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

exports.delete = async (req, res, next) => {
	try {
		//get user id from jwt
		let userId = req.user.sub;
		req.body.userId = userId;
		req.body.todoId = req.params.todoId;
		let deleteTodo = await todoService.delete(req.body);
		if (deleteTodo.affectedRows > 0) {
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

