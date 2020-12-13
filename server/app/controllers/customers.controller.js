//Change This//////////////////////////
const controllerPrefix = 'customers';
const tableName = 'customers';
const referenceTableID = 'id';
/////////////////////////////////////
const service = require('../services/'+controllerPrefix+'.service');
const connection = require('../helpers/dbconnect.helper');
const { all } = require('../routes/user.route');

exports.add = async (req, res,next) => {
	console.log(req.body);
	
	let theQuery = req.body;
	try {

		let result = await service.add(theQuery);
		let latest = await service.getLatest();
		if(result.affectedRows > 0){
			return res.json({
				status: true,
				message: `Element added sucessfull`,
				result: latest
			});
		} else {
			return res.json({
				status: false,
				message: `Somthing went wrong`,
				result: latest
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

exports.update = async (req, res,next) => {
	let theQuery = req.body;
	try {
		let result = await service.update(theQuery);
		let currentElement = await service.getById(theQuery.id);
	
		if(result.affectedRows > 0){
			return res.json({
				status: true,
				message: `Element updated sucessfully`,
				result: currentElement
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

exports.list = async (req, res, next) => {
	try {
		
		
		let result = await service.list(req.query);
		
		if (result.length > 0) {
			let totalItems=0;
			connection.query(`select count(*) as totalRows from `+tableName+` `,
			function (error, totalCounts){
				if(error) {
					return reject(error);
				}else{
					totalItems= totalCounts[0].totalRows;
					
					return res.json({
						status: true,
						"total": totalItems,
						message: `Sucess!`,
						result: result,
						
					});
				}
			});
			
		} else {
			return res.json({
				status: false,
				message: `There is no element, please create it first`,
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
	
		let deleteRequest = await service.delete(req.params.id);
		if (deleteRequest.affectedRows > 0) {
			return res.json({
				status: true,
				message: `element has been deleted`,
				result: null
			});
		} else {
			return res.json({
				status: false,
				message: `You have not access to delete this element`,
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
	
		let deleteRequest = await service.deleteMany(req.query);

		if (deleteRequest.affectedRows > 0) {
			return res.json({
				status: true,
				message: `element has been deleted`,
				result: null
			});
		} else {
			return res.json({
				status: false,
				message: `You have not access to delete this element`,
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
		let element = await service.getById(req.params.id);
		if(element){
			return res.json({
				status: true,
				message: `element is found`,
				result: element
			});
		} else {
			return res.json({
				status: true,
				message: `element not found for givan id`,
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
exports.getMany = async (req, res, next) => {
	try {
		
	
		let result = await service.getMany(req.query);
		if (result.length > 0) {
			console.log(result.length);
			let totalItems=0;
			connection.query(`select count(*) as totalCounts from `+tableName+` where id in (`+req.query.id+`)`,
			function (error, totalCounts){
				if(error) {
					return reject(error);
				}else{
					totalItems= totalCounts[0].totalRows;
					
					return res.json({
						status: true,
						"total": totalCounts,
						message: `Sucess!`,
						result: result,
						
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