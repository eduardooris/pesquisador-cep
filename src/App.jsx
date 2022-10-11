import { FiSearch } from 'react-icons/fi'
import {useState} from 'react';

import './App.css';

import api from './components/services/api';
import Carregando from './components/Carregando';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [loading, setLoading] = useState(false)


  async function handleSearch() {
    if (input === '') {
      alert("Preencha o campo corretamente")
    } 
    try {
      setLoading(true)
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setLoading(false)
      setInput('')
      }
      
      catch {
        alert("CEP inválido")
        setCep('')
        setInput('')
      }

    finally {
      setLoading(false)
    }
  }

  
  const onKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(onKey)
    }
  }

  console.log(loading)
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
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD: 0{cep.ddd}</span>
        </main>
      )}
      
      
      <footer>
        Eduardo Oris
      </footer>
    </div>
  );
}

export default App;
