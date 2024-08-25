import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')
  const [price, setPrice] = useState('')
  const {id} = useParams()

  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL
  const navigate = useNavigate()

useEffect(()=>{
    getProductById()
},[])

  const getProductById = async(e) =>{
    const response = await axios.get(`${apiUrl}/product/${id}`)
    setName(response.data.name)
    setPrice(response.data.price)
    setFile(response.data.image)
    setPreview(response.data.url)
  }

  const updateProduct = async e => {
    e.preventDefault()
    console.log(name, file, price)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    formData.append('price', price)
    try {
      const response = await axios.patch(`${apiUrl}/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const loadImage = e => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  return (
    <div>
      <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Tambah Produk</h2>
        <form onSubmit={updateProduct}>
          <div className='mb-4'>
            <label
              htmlFor='nama'
              className='block text-gray-700 font-bold mb-2'
            >
              Nama Produk
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Masukkan nama produk'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='file'
              className='block text-gray-700 font-bold mb-2'
            >
              Gambar Produk
            </label>
            <input
              type='file'
              id='file'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
              onChange={loadImage}
            />
            {preview && (
              <div className='mt-2'>
                <img
                  src={preview}
                  alt='Preview'
                  className='max-w-full h-auto rounded-lg'
                />
              </div>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='harga'
              className='block text-gray-700 font-bold mb-2'
            >
              Harga Produk
            </label>
            <input
              type='number'
              id='harga'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Masukkan harga produk'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className='flex justify-between gap-2'>
            <Link
              to='/'
              className='w-full text-center bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring'
            >
              Back
            </Link>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring'
            >
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProduct
