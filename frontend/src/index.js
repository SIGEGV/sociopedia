import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  {BrowserRouter} from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from './components/Context/ChatProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <ChatProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
