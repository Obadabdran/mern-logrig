import {Rigester,Login,Page, Admin}from'./sections/index'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
function App() {


  return (
    <BrowserRouter>
    <div className='bg-slate-200 h-screen'>
      <Routes>
       <Route path='/' element={<Rigester/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/admin' element={<Admin/>}/>
       <Route path='/login/page' element={<Page/>}/>
       <Route path='/login/page' element={<Rigester/>}/>
       </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
