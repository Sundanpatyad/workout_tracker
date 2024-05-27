import { ThemeProvider, styled } from "styled-components"
import { lightTheme } from "./utils/Themes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Authentication from "./Pages/Authentication";
import { useState } from "react";
import Navbar from "./components/Navbar";
import  Dashbord  from "./Pages/Dashbord";
import Workout from "./Pages/Workout";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
      {currentUser ? <Container>
        <Navbar currentUser={currentUser}/>
        <Routes>
          <Route path="/" element={<Dashbord/>}/>
          <Route path="/workouts" element={<Workout/>}/>
        </Routes>
      </Container> :
        <Container>
          <Authentication />
        </Container>}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
