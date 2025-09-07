import React, { useState } from "react";
import "./App.css";
/*import About from './components/About';*/
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";

function App() {
  const [mode, setMode] = useState("light");
  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
        setAlert(null);
      }, 1500);
  }
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#121212"; // dark bg
      document.body.style.color = "white"; // light text
      showAlert("Enabled Dark Mode","Succes");
     
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white"; // light bg
      document.body.style.color = "black"; // dark text
      showAlert("Enabled Light Mode","Succes");
      
      
    }
  };

  return (
    <>
      <Navbar title="Word Counter" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert}/>
      <div className="container my-3">
        <TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode}/>
        {/* <About/> */}
        
      </div>
    </>
  );
}

export default App;
