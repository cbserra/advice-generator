import { useEffect, useState } from 'react';
import './App.css';
import useAxios from 'axios-hooks';
import desktopDivider from './images/pattern-divider-desktop.svg';
import mobileDivider from './images/pattern-divider-mobile.svg';

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
      <main>
      { 
      (
        <h1>Advice { slip ? `#${slip.id}` : '...' }</h1>
      )
      }
      { loading 
        ? (
          <div className="loading-message">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              Loading...
          </div>
          )
        : error && 
          (
          <div className="error-message">
            <i className="fa fa-times-circle"></i>
            {error.message}
          </div>
          )
        }
        {  
        (
        <q className="advice-quote">
          { (!loading && slip) ? slip.advice : '...' }
        </q>
        )
        }
        <picture>
          <source srcSet={mobileDivider} media="(min-width: 375px) and (max-width: 999px)" />
          <img src={desktopDivider} alt="divider" />
        </picture>
        <div className="next-quote" onClick={() => refetch()}>
        </div>
      </main>
    </div>
  )
}

export default App;
