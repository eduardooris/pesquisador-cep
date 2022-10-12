import React, {useState} from 'react'; //Sempre importe o "React" pro seu arquivo JSX
import { FiSearch } from 'react-icons/fi'

import './index.css';
import api from '../../services/api';
import Loading from '../../components/Loading';

const App = () => {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSearch = async() => {
    setLoading(true)
    try {
      await api.get(`${input}/json`).then(response => {
        if(response.status === 200) { //Se o get retornar OK (200)
            console.log("ok");
            console.log(response);
            setCep(response.data)
            setLoading(false)
            setInput('')
        } else {
            console.log("Something wrong...");
            alert("Servidor está indisponível no momento, tente mais tarde!")
            setLoading(false)
            setInput('')
        }
      });
      }
      catch {
        setLoading(false);
        //alert("CEP inválido")
        alert("Algo ocorreu errado, seu CEP está correto? Talvez você precise tentar novamente mais tarde.")
        setCep('')
        setInput('')
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
          placeholder='Digite seu CEP'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          />

        <button className='buttonSearch' onClick={handleSearch} ><FiSearch size={25} color="FFF" /></button>
      </div>
      {loading === true ? (
        <Loading type='spokes' color="white" height={100} width={50} />
      ) : (
        Object.keys(cep).length > 0 ? (
            <main className='main'>
              <h2>CEP: {cep.cep}</h2>
              <span>Rua: {cep.logradouro}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
              <span>DDD: 0{cep.ddd}</span>
            </main>
          ) : ''
      )}
      <footer>
        Eduardo Oris
      </footer>
    </div>
  );
}

export default App;
