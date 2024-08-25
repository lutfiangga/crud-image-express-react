import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Card from './card'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [openMenuId, setOpenMenuId] = useState(null)

  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await axios.get(`${apiUrl}/product`)
    setProducts(response.data)
  }

  const toggleMenu = id => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const deleteProduct = async id => {
    try {
      await axios.delete(`${apiUrl}/product/${id}`)
      getProducts()
      console.log('Produk berhasil dihapus')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Daftar Produk</h1>
          <Link
            to={'/add'}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
          >
            Tambah Produk
          </Link>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => (
            <Card
              key={product.id}
              product={product.name}
              deskripsi={product.name}
              harga={`Rp. ${product.price.toLocaleString('id-ID')}`}
              image={product.url}
            >
              <div className='absolute top-2 right-2'>
                <button
                  className='bg-white text-gray-700 hover:bg-gray-100 font-bold py-2 px-3 rounded-full shadow transition duration-300 ease-in-out'
                  onClick={() => toggleMenu(product.id)}
                >
                  •••
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ${
                    openMenuId === product.id ? '' : 'hidden'
                  }`}
                >
                  <Link
                    to={`edit/${product.id}`}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-b-lg'
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductList
