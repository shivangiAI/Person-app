import './App.css';
import SignUpPage from './Components/SignUp/index.tsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignInPage from './Components/SignIn/index.tsx';
import Home from './Components/Home/index.tsx';
import PersonList from './Components/Person/PersonList/index.tsx';
import ProjectList from './Components/Project/ProjectList/index.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUpPage/>}/>
          <Route exact path="/signIn" element={<SignInPage/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/personList" element={<PersonList/>}/>
          <Route exact path="/projectList" element={<ProjectList />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
