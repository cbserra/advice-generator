import React, { useState } from 'react';
import './App.css';
import diceIcon from './images/icon-dice.svg'
import useAxios from 'axios-hooks';

function App() {
  
  const [{ response, loading, error }, refetch] = useAxios({
    method: 'get',
    url: 'https://api.adviceslip.com/advice',
  });

  const [advice, setAdvice] = useState<string>("")

  React.useEffect(() => { 
    if (response != null) {
      setAdvice(response.data.slip.advice)
    }
  },
  [response])

  return (
    <div className="App">
      <header className="advice-header">
        Advice #1111
      </header>
      <main className="advice-container">
        {loading 
          ? (<div className="info-message">
                <i className="fa fa-info-circle"></i>
                Loading...
            </div>)
          :  error && (
                  <div className="error-message">
                      <i className="fa fa-times-circle"></i>
                      {error.message}
                  </div>
                )
          }
          {   advice && (
                <div className="advice-quote">
                  {advice}
                </div>
              )
            }
      </main>
      <footer>
        <div className="advice-divider"></div>
        <div className="next-quote" onClick={() => refetch()}>
          <img src={diceIcon} alt="next quote"/>
        </div>
      </footer>
    </div>
  );
}

export default App;
