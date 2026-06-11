import ListaEspera from './components/pages/ListaEspera'

// Estilos básicos apenas para o site não ficar totalmente desalinhado
import './index.css' 

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>Painel Clínica Pontinho Azul</h1>
      <ListaEspera />
    </div>
  )
}
