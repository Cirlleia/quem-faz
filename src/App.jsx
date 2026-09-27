import React, { useState } from 'react';
import comerciantesData from './data/comerciantes.json';
import { BusinessCard } from './components/BusinessCard.jsx';

export default function App() {
  const [busca, setBusca] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [ordem, setOrdem] = useState('nome'); // 'nome' ou 'categoria'

  const cidadesDisponiveis = [...new Set(comerciantesData.map(c => c.cidade))].sort();

  // 1. Filtrar por texto e cidade
  const comerciantesFiltrados = comerciantesData.filter(item => {
    const atendeFiltroTexto = 
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase()) ||
      item.bairro.toLowerCase().includes(busca.toLowerCase());

    const atendeFiltroCidade = cidadeSelecionada === '' || item.cidade === cidadeSelecionada;

    return atendeFiltroTexto && atendeFiltroCidade;
  });

  // 2. Ordenar alfabeticamente por Nome ou Categoria
  const comerciantesOrdenados = [...comerciantesFiltrados].sort((a, b) => {
    if (ordem === 'categoria') {
      const comparacaoCategoria = a.categoria.localeCompare(b.categoria, 'pt-BR');
      if (comparacaoCategoria !== 0) return comparacaoCategoria;
      return a.nome.localeCompare(b.nome, 'pt-BR');
    }
    return a.nome.localeCompare(b.nome, 'pt-BR');
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Cabeçalho */}
      <header className="bg-emerald-600 text-white py-8 px-4 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold mb-2">🔍 Quem faz?</h1>
          <p className="text-emerald-100 text-base max-w-lg mx-auto">
            Encontre serviços locais, pequenos comerciantes e profissionais da sua região com um clique.
          </p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Filtros e Ordenação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cidade</label>
            <select
              value={cidadeSelecionada}
              onChange={(e) => setCidadeSelecionada(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            >
              <option value="">📍 Todas as cidades</option>
              {cidadesDisponiveis.map(cidade => (
                <option key={cidade} value={cidade}>{cidade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Buscar</label>
            <input
              type="text"
              placeholder="🔍 O que precisa?"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ordenar por</label>
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            >
              <option value="nome">🔤 Nome (A-Z)</option>
              <option value="categoria">🏷️ Categoria (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Lista de Resultados */}
        {comerciantesOrdenados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comerciantesOrdenados.map(item => (
              <BusinessCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">Nenhum profissional encontrado para esta busca ou cidade.</p>
          </div>
        )}
      </main>

      {/* Rodapé (Footer) */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-sm border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {new Date().getFullYear()} Quem faz? — Plataforma de Conectividade Local</p>
          <div className="flex items-center gap-3">
            <span>Desenvolvido por <strong className="text-white">Cirleia Souza</strong></span>
            <span className="text-slate-600">•</span>
            <a
              href="https://github.com/Cirlleia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.linkedin.com/in/cirleia-souza-3846ab2b4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}