import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <button className="btn btn-primary">Clique moi !</button>
        <button className="btn btn-active">Default</button>
        <button className="btn btn-active btn-primary">Primary</button>
        <button className="btn btn-active btn-secondary">Secondary</button>
        <button className="btn btn-active btn-accent">Accent</button>
        <button className="btn btn-active btn-info">Info</button>
        <button className="btn btn-active btn-success">Success</button>
        <button className="btn btn-active btn-warning">Warning</button>
        <button className="btn btn-active btn-error">Error</button>
      </div>
  );
}

export default App;
