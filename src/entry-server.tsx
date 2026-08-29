import { renderToString } from 'react-dom/server'
import App from './App'
import './index.css'

export function render(): string {
  return renderToString(<App />)
}
