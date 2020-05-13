const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const detailController = {
	root: (req, res) => {
		let productsVisited = productos.filter( product => product.category == 'visited')
		let productsSale = productos.filter( product => product.category == 'in-sale')
		
		res.render('index', {productsVisited, productsSale, toThousand})
	},
	search: (req, res) => {
		//let ProductoBuscado = productos.filter( product => product.name == productos.name);
	
		//res. render ('results', {ProductoBuscado,toThousand});
	},
};

module.exports = detailController;
