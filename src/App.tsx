import { useEffect, useState } from 'react';
import './App.css';
import diceIcon from './images/icon-dice.svg'
import useAxios from 'axios-hooks';

export interface Slip {
  id: number,
  advice: string
}

 const App = () => {
  
  const [{ response, loading, error }, refetch] = useAxios({
    method: 'get',
    url: 'https://api.adviceslip.com/advice',
  })
  const [slip, setSlip] = useState<Slip>()

  useEffect(() => { 
    if (response != null) {
      setSlip(response.data.slip)
    }
  },
  [response])

  return (
    <div className="App">
      { slip && (
      <header className="advice-header">
        Advice #{slip.id}
      </header>
      )}
      <main className="advice-container">
        {loading 
          ? (<div className="loading-message">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              Loading...
            </div>)
          :  error && (
                  <div className="error-message">
                      <i className="fa fa-times-circle"></i>
                      {error.message}
                  </div>
                )
          }
          {   slip && (
                <div className="advice-quote">
                  {slip.advice}
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
  )
}

export default App;
