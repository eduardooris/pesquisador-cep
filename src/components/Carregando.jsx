import ReactLoading from 'react-loading';
const Carregando = ({ type, color, height, width }) => (
    <div>
        <ReactLoading type={type} color={color} height={height} width={width} />

    </div>
);
 
export default Carregando;