const Card = ({ product, deskripsi, harga, image, children }) => {

  return (
    <div className='w-full px-2 mb-4'>
      <div className='rounded overflow-hidden shadow-lg relative'>
        {children}
        <div className='max-w-full max-h-full'>
          <img
            className='object-cover'
            src={
              !image
                ? 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'
                : image
            }
            alt='Gambar Produk 1'
          />
        </div>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{product}</div>
          <p className='text-gray-700 text-base'>{deskripsi}</p>
        </div>
        <div className='px-6 pt-4 pb-2'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            {harga}
          </span>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
