const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const rutaJson = path.join(__dirname, '../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productsController = {
	// Root - Show all products 
	root: (req, res) => {
		res.render('products', {productos});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = req.params.productId;
		console.log(idProducto);
		let productoEncontrado = productos.find(producto => producto.id == idProducto);

		res.render ('detail', {productoEncontrado,toThousand});
	},
	// Create - Form to create
	create: (req, res) => {
		let productToCreate = '';
		res.render('product-create-form', {productToCreate});
		res.redirect('/');
	},
	// Create -  Method to store
	store: (req, res) => {
		let productoNuevo = {
			id: productos[productos.length -1].id + 1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category
		}
		productos.push(productoNuevo)
		fs.writeFileSync(rutaJson, JSON.stringify(productos, null, ' '))
		res.redirect('/products')
	},
	// Update - Form to edit
	edit: (req, res) => {
		let productId = req.params.productId;
		let productToEdit = productos.find(productoAEditar => productoAEditar.id == productId);
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let productoAEditar = req.params.productId;
		let BaseDeDatosAEditar = [];
        productos.forEach(product => {
        if (product.id == productoAEditar) {
            product.name = req.body.name
            product.description = req.body.description
            product.price = req.body.price
            product.discount = req.body.discount
            product.image = "default-image.png"
            product.category = req.body.category           
		} else {
			BaseDeDatosAEditar.push(productos)
		}
	});
       let productosJson = JSON.stringify(productos)
		fs.writeFileSync(productsFilePath, productosJson)
        res.redirect('/')
        },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productosId = req.params.productId;
		let productToDelete = productos.filter( productos => productos.id != productosId);
		let productoEliminado = JSON.stringify(productToDelete);
		fs.writeFileSync(productsFilePath, productoEliminado);
		res.redirect('/');
	}
};

module.exports = productsController;