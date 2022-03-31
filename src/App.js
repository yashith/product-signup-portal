import './App.css';
import { signInWithGoogle } from './Firebase/firebase-auth';
import { Button } from 'react-bootstrap';
import IgtForm from './Components/igt_form';
import FormContainer from './Pages/Form-container';


function App() {
  return (
      <FormContainer/>
  );
}

export default App;
