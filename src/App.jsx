import { FiSearch } from 'react-icons/fi'
import { useState } from 'react';
import './App.css';

import api from './components/services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

 async function handleSearch() {
    if (input === '') {
      alert("Preencha algum cep")
      return
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }

    catch{
      alert("Opss... Erro ao buscar local")
      setInput('')
    }
  }

  return (
    <div className="Container">
      <h1 className='title'>Consultar CEP</h1>
 
      <div className="containerInput">
        <input
          type="text"
          placeholder='Digite seu cep...'
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button className='buttonSearch' onClick={handleSearch} ><FiSearch size={25} color="FFF" /></button>
      </div>

      
    {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>DDD: 0{cep.ddd}</span>
      </main>
    )}
    </div>
  );
}

export default App;
