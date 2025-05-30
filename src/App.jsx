import bibliothecaLogo from "/bibliotheca.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a
          href="https://github.com/MariaMartinezRos/Bibliotheca.git"
          target="_blank"
        >
          <img src={bibliothecaLogo} className="logo" alt="Bibliotheca logo" />
        </a>
        <h2>Bibliotheca</h2>
      </div>
    </>
  );
}

export default App;
