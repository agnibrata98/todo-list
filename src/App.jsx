import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShowTodo from './components/ShowTodo'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import ShowRandomTodo from './components/ShowRandomTodo'
import Header from './components/Header'
import { Create } from '@mui/icons-material'
import CreateTodo from './components/CreateTodo'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<ShowTodo />} />
          <Route path='/randomtodo' element={<ShowRandomTodo />} />
          {/* <Route path='/create' element={<CreateTodo />} /> */}
          {/* <Route path="/products/:id" element={<ProductsDetails />} /> */}
          {/* <Route path="/category/:slug" element={<CategoryProducts />} /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
