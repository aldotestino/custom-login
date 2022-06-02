import NavBar from "./components/NavBar";
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import {Box} from "@chakra-ui/react";
import Secret from "./views/Secret";

function App() {

  return (
    <Box h="100vh">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/secret" element={<Secret />}/>
      </Routes>
    </Box>
  )
}

export default App;
