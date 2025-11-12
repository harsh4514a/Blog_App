import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';
import "flowbite-react";
import "flowbite";
import "./styles/fixFlowbite.css";

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);
