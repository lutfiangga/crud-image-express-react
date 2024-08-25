import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductList from './components/product-list'
import AddProduct from './components/add-product'
import UpdateProduct from './components/update-product'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='add' element={<AddProduct/>}/>
        <Route path='edit/:id' element={<UpdateProduct/>}/>
      </Routes>
    </Router>
  )
}

export default App
