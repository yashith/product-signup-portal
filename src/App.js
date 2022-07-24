import './App.css';
import FormContainer from './Pages/Form-container';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route key="oGT" path="/oGT/*"  element={<FormContainer product="oGT" />}/>
        <Route key="oGV" path="/oGV/*"  element={<FormContainer product="oGV" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
