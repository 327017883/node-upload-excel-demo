
let xlsx = require('node-xlsx');
let fs = require('fs'); 
let multer  = require('multer')
let path = require('path');
let axios = require('axios');

const uploadUrl = 'upload/';
const staticsUrl = 'statics/';

let upload = multer({ dest: staticsUrl + uploadUrl }) 

let pages = {

	//首页
	index : {
		getUrl: '/',
		renderUrl: 'index/index',
		title: '通过html5上传文件(excel)'
	}
};
		
module.exports = function(app){

	app.get(pages.index.getUrl, function(req, res){

		let result = {
			title: pages.index.title
		};
		
		res.render( pages.index.renderUrl, result);

		let mtHost = 'https://weixin.100lending.com';
		let interface = [
			'/mobile/v140/home.json',
			'/mobile/v140/product/listing.json?pageSize=10&productType=1&&productArea=1&pageNum=0&time=1512098973712',
			'/mobile/v140/product/listing.json?pageSize=10&productType=1&productArea=2&pageNum=0&time=1512099029807', 
			'/mobile/product/invest/investRecord.json?pageSize=15&productId=1&pageNum=0&time=1512099088522',
			'/mobile/product/asset/list.json?productId=1&pageNum=0&time=1512099088523',
			'/mobile/product/currentDetail.json?time=1512099088376'
		];

		//获取数据
		// axios.get( mtHost + '/mobile/v140/product/listing.json', { params: { pageSize: 50,  productType: 1, productArea: 3, pageNum: 0}})
		// .then(function (res) {
		// 	if(res.status == 200){
		// 		console.log(res.data)
		// 	}
		// })

	});
	
	app.post('/loadfile',  upload.array('upload'), function(req, res){

  		let files = req.files;

  		let fileUrl = [];
  		let filePath = [];

  		files.forEach(function(file){
  			let newName = Math.random().toString(36).substring(2) + '-' + file.originalname;
  			let path = staticsUrl + uploadUrl + newName;
  			fileUrl.push(uploadUrl + newName);
  			filePath.push(path);
  			fs.renameSync(file.path, path);
  		})

  		res.send({code: 1, url: fileUrl});
		
		
		let data = xlsx.parse(path.join(__dirname, '../', filePath[0]));
		
		for(let i = 0, len = data.length; i < len; i++){
			if(data[i].data.length > 0){
				console.log(data[i])
			}
		}
	})
};