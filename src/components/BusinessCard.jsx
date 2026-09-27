import React from 'react';
import { useTextToSpeech } from './useTextToSpeech.js';

export function BusinessCard({ item }) {
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const textoParaOuvir = `${item.nome}. Categoria: ${item.categoria}. Localizado em ${item.bairro}, ${item.cidade}. Descrição: ${item.descricao}`;

  const mensagemWhatsapp = encodeURIComponent(`Olá ${item.nome}, encontrei o seu perfil no Quem faz? e gostaria de mais informações!`);
  const linkWhatsapp = `https://wa.me/${item.whatsapp}?text=${mensagemWhatsapp}`;

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {item.categoria}
        </span>
        <button
          onClick={() => isSpeaking ? stop() : speak(textoParaOuvir)}
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded-lg font-medium transition-colors ${
            isSpeaking ? 'bg-red-100 text-red-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Ouvir perfil em áudio"
        >
          {isSpeaking ? '🔇 Parar' : '🔊 Ouvir'}
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1">{item.nome}</h3>
      
      <p className="flex items-center gap-1 text-sm text-slate-500 mb-3">
        📍 {item.bairro} • {item.cidade}/{item.estado}
      </p>

      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.descricao}</p>

      <a
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors"
      >
        💬 Chamar no WhatsApp
      </a>
    </div>
  );
}