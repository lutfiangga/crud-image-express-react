import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProduct = async(req,res)=>{
    try {
        const response = await Product.findAll()
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async(req,res)=>{
    try {
        const response = await Product.findOne({
            where : {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async (req, res) => {
       try {
        // Cek apakah ada file yang diunggah
        if (!req.files || !req.files.file) {
            return res.status(400).json({ msg: "No files were uploaded" });
        }

        const name = req.body.name;
        const price = req.body.price;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowType = ['.png', '.jpg', '.jpeg','.webp'];

        // Validasi tipe file
        if (!allowType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid file type" });
        }

        // Validasi ukuran file
        if (fileSize > 5000000) {  // Ubah 50000000 (50MB) menjadi 5000000 (5MB)
            return res.status(422).json({ msg: "File must be less than 5MB" });
        }

        // Pindahkan file ke folder tujuan
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
            try {
                // Buat data produk di database
                await Product.create({ name: name, image: fileName, url: url, price: price });
                res.status(201).json({ msg: "Product added" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Failed to add product" });
            }
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    let fileName = "";

    if (req.files === null) {
        // Jika tidak ada file yang diunggah, gunakan file gambar lama
        fileName = product.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const allowType = [".png", ".jpg", ".jpeg", ".webp"];

        if (!allowType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid file type" });
        }

        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "File must be less than 5MB" });
        }

        fileName = file.md5 + ext;

        const filePath = `./public/images/${product.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Hapus file lama jika ada
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        });
    }

    const name = req.body.name;
    const price = req.body.price;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update(
            { name: name, image: fileName, url: url, price: price },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Product updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to update product" });
    }
};


export const deleteProduct = async(req,res)=>{
   const product = await Product.findOne({
            where : {
                id : req.params.id
            }
    });
    if(!product) return res.status(404).json({msg : "Product not found"})
    try {
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);
        await Product.destroy({
            where : {
                id : req.params.id
            }
        });
        res.status(200).json({msg : "Product deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "Failed to delete product"});
}}