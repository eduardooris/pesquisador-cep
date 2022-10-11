import { FiSearch } from 'react-icons/fi'
import { useState } from 'react';

import './App.css';

import api from './components/services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const Loading = useState(false)


  async function handleSearch() {

    if (input === '') {
      <div>
        Preencha todos os campos
      </div>
    } else {
      try {
        const response = await api.get(`${input}/json`)
        setCep(response.data)
        Loading(true)
        setInput('')
      }

      catch {
        console.log("deu erro")
        setInput('')
      }
    }
  }

  const onKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(onKey)
    }
  }

  return (
    <div className="Container">
      <div className="container"></div>
      <h1 className='title'>Consultar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder='Digite seu cep...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
        />

        <button className='buttonSearch' onClick={handleSearch} ><FiSearch size={25} color="FFF" /></button>
      </div>

      <div>
      {Object.keys(cep).length > 0 &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD: 0{cep.ddd}</span>
        </main>
      )}
      </div>

      <footer>
        Eduardo Oris
      </footer>
    </div>
  );
}

export default App;
