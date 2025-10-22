// import logo from './logo.svg';
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import TodoList2 from "./components/TodoList";
//them
import { createTheme } from "@mui/material/styles";
//==========================================
//context
import { dataContext } from "./components/context/context";
//======================================
//uuid
import { v4 as uuidv4 } from "uuid";
 //===============================
const list_Misstoes = [
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    description: "تفاصيل المهمة الاولي",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    description: "تفاصيل المهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثالثة",
    description: "تفاصيل المهمة الثالثة",
    isCompleted: false,
  },
];

// import Portfolio from "./compon/protofolio";

const Theme = createTheme({
  //  سواء كانت في زرار او اي مكون typography لان اي كتابة هنا تعتبر typographyاستخدمت هنا ال
  typography: {
    fontFamily: "Cairo",
    // fontSize:"30px",
  },
}); 

function App() {
   
  return (
    <ThemeProvider theme={Theme}>
      {/* <header className="App-header"> */}
      <dataContext.Provider value={list_Misstoes}>
        <TodoList2 />
      </dataContext.Provider>
      {/* </header> */}
    </ThemeProvider>
    // <Portfolio/>
  );
}

export default App;
