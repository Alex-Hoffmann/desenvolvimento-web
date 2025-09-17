// ===============================
// src/main.jsx
// ===============================
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// ===============================
// src/App.jsx
// ===============================
import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

export default function App() {
  // Dados do post armazenados no componente raiz
  const post = {
    titulo: 'Entendendo Componentes, JSX e Props no React',
    autor: 'Alex Roberto Hoffmann',
    data: '17 de setembro de 2025',
    conteudo: `
      Componentes são as unidades fundamentais de uma aplicação React. 
      Eles permitem decompor a interface em partes menores, reutilizáveis e fáceis de manter. 
      Com JSX, descrevemos a UI de forma declarativa, combinando a expressividade do JavaScript 
      com a familiaridade do HTML. As props possibilitam que dados fluam do componente pai para 
      componentes filhos, tornando a interface dinâmica sem acoplamento desnecessário.

      Neste post, vamos aplicar esses conceitos para refatorar um layout de blog em uma aplicação React, 
      organizando a estrutura em componentes bem definidos e passando dados via props para renderização dinâmica.
    `,
  }

  const links = [
    { href: '#inicio', rotulo: 'Início' },
    { href: '#posts', rotulo: 'Posts' },
    { href: '#sobre', rotulo: 'Sobre' },
    { href: '#contato', rotulo: 'Contato' },
  ]

  const relacionados = [
    { id: 1, titulo: 'Ciclo de Vida e Hooks Básicos', href: '#' },
    { id: 2, titulo: 'Estado (useState) na Prática', href: '#' },
    { id: 3, titulo: 'Estilizando Componentes no React', href: '#' },
  ]

  return (
    <div className="container">
      <Header titulo="Meu Blog com React" />
      <Navigation links={links} />

      <main className="layout">
        <Article
          titulo={post.titulo}
          autor={post.autor}
          data={post.data}
          conteudo={post.conteudo}
        />
        <Sidebar postsRelacionados={relacionados} />
      </main>

      <Footer ano={new Date().getFullYear()} autorSite="Meu Blog" />
    </div>
  )
}

// ===============================
// src/components/Header.jsx
// ===============================
import React from 'react'

export default function Header({ titulo }) {
  return (
    <header className="header">
      <h1>{titulo}</h1>
    </header>
  )
}

// ===============================
// src/components/Navigation.jsx
// ===============================
import React from 'react'

export default function Navigation({ links = [] }) {
  return (
    <nav className="nav">
      <ul>
        {links.map((link) => (
          <li key={link.rotulo}>
            <a href={link.href}>{link.rotulo}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ===============================
// src/components/Article.jsx
// ===============================
import React from 'react'

export default function Article({ titulo, autor, data, conteudo }) {
  return (
    <article className="article">
      <h2>{titulo}</h2>
      <p className="meta">
        <span>Por {autor}</span> • <time>{data}</time>
      </p>
      {/* Conteúdo pode vir como string longa; aqui dividimos por quebras de linha para parágrafos. */}
      {String(conteudo)
        .split('\n')
        .filter(Boolean)
        .map((par, idx) => (
          <p key={idx}>{par.trim()}</p>
        ))}
    </article>
  )
}

// ===============================
// src/components/Sidebar.jsx
// ===============================
import React from 'react'

export default function Sidebar({ postsRelacionados = [] }) {
  return (
    <aside className="sidebar">
      <h3>Posts relacionados</h3>
      <ul>
        {postsRelacionados.map((p) => (
          <li key={p.id}>
            <a href={p.href}>{p.titulo}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

// ===============================
// src/components/Footer.jsx
// ===============================
import React from 'react'

export default function Footer({ ano, autorSite }) {
  return (
    <footer className="footer">
      <small>© {ano} {autorSite}. Todos os direitos reservados.</small>
    </footer>
  )
}

// ===============================
// src/index.css
// ===============================
/* Estilização simples inspirada no layout do blog das aulas anteriores */
:root {
  --bg: #0f172a; /* slate-900 */
  --card: #111827; /* gray-900 */
  --muted: #94a3b8; /* slate-400 */
  --text: #e5e7eb; /* gray-200 */
  --accent: #60a5fa; /* blue-400 */
}

* { box-sizing: border-box; }
html, body, #root { height: 100%; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', Arial, sans-serif;
  background: radial-gradient(1200px 400px at 10% -10%, rgba(96,165,250,0.15), transparent 40%),
              radial-gradient(800px 300px at 120% 10%, rgba(14,165,233,0.15), transparent 40%),
              var(--bg);
  color: var(--text);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.1));
  box-shadow: 0 10px 30px rgba(2,6,23,0.5);
}
.header h1 { margin: 0; }

.nav { margin: 16px 0 24px; }
.nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav a {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 9999px;
  text-decoration: none;
  color: var(--text);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}
.nav a:hover { background: rgba(255,255,255,0.12); }

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.article, .sidebar {
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.5);
}

.article h2 { margin-top: 0; }
.meta { color: var(--muted); margin-top: -8px; }
.article p { line-height: 1.7; }

.sidebar h3 { margin-top: 0; }
.sidebar ul { list-style: none; padding: 0; margin: 0; }
.sidebar li { margin: 8px 0; }
.sidebar a { color: var(--accent); text-decoration: none; }
.sidebar a:hover { text-decoration: underline; }

.footer {
  margin-top: 24px;
  padding: 16px 24px;
  text-align: center;
  color: var(--muted);
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}
