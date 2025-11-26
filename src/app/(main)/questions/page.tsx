"use client"
import { useState } from "react";

export default function Home() {
  const [popupCadastro, setPopupCadastro] = useState(false);
  const [popupEditar, setPopupEditar] = useState(false);
  const [popupSair, setPopupSair] = useState(false);
  const [popupCancelarCadastro, setPopupCancelarCadastro] = useState(false);
  const [popupCancelarEdicao, setPopupCancelarEdicao] = useState(false);
  const [menuFiltro, setMenuFiltro] = useState(false);

  const questoes = Array.from({ length: 10 }, (_, i) => `Questão ${i + 1} - (Disciplina)`);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-blue-900 text-white flex justify-between items-center px-6 rounded-b-md z-10">
        <h2 className="text-xl font-semibold">Projeto Avalia - Área do Professor</h2>
        <div className="flex items-center gap-3 text-lg">
          <span>João da Silva Cunha</span>
          <button className="text-white text-2xl" onClick={() => setPopupSair(true)}>⎋</button>
        </div>
      </header>

      {/* LISTA DE QUESTÕES */}
      <main className="pt-28 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Pesquisar questão..."
              className="w-96 px-3 py-2 rounded border border-gray-300"
            />
            <button
              className="px-4 py-2 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white"
              onClick={() => setMenuFiltro(true)}
            >
              ☰ Filtros
            </button>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white">Gerar prova</button>
            <button
              className="px-4 py-2 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white"
              onClick={() => setPopupCadastro(true)}
            >
              Adicionar questão
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {questoes.map((q, idx) => (
            <li key={idx} className="bg-white rounded p-3 flex justify-between items-center">
              {q}
              <button className="text-xl" onClick={() => setPopupEditar(true)}>✎</button>
            </li>
          ))}
        </ul>
      </main>

      {/* POPUPS */}
      {popupCadastro && (
        <Popup onClose={() => setPopupCadastro(false)} title="Cadastrar questão">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <label>Disciplina:</label>
              <select className="border border-gray-300 rounded p-2">
                <option>Matemática</option>
                <option>Português</option>
                <option>História</option>
              </select>
              <label>Enunciado:</label>
              <textarea className="border border-gray-300 rounded p-2 min-h-[100px]" />
            </div>
            <div className="flex flex-col gap-2">
              <h4>Respostas:</h4>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <input type="text" placeholder={`Resposta ${i + 1}`} className="flex-1 border border-gray-300 rounded p-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setPopupCancelarCadastro(true)}>Cancelar</button>
            <button className="px-4 py-2 bg-blue-900 text-white rounded">Salvar</button>
          </div>
        </Popup>
      )}

      {popupEditar && (
        <Popup onClose={() => setPopupEditar(false)} title="Editar questão">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <label>Disciplina:</label>
              <select className="border border-gray-300 rounded p-2">
                <option>Matemática</option>
                <option>Português</option>
                <option>História</option>
              </select>
              <label>Enunciado:</label>
              <textarea className="border border-gray-300 rounded p-2 min-h-[100px]" />
            </div>
            <div className="flex flex-col gap-2">
              <h4>Respostas:</h4>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <input type="text" placeholder={`Resposta ${i + 1}`} className="flex-1 border border-gray-300 rounded p-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setPopupCancelarEdicao(true)}>Cancelar</button>
            <button className="px-4 py-2 bg-blue-900 text-white rounded">Salvar</button>
          </div>
        </Popup>
      )}

      {popupSair && (
        <Popup onClose={() => setPopupSair(false)} title="Sair da conta">
          <p>Tem certeza que deseja sair?</p>
          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setPopupSair(false)}>Cancelar</button>
            <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={() => window.location.href = "/"}>Sair</button>
          </div>
        </Popup>
      )}

      {popupCancelarCadastro && (
        <Popup onClose={() => setPopupCancelarCadastro(false)} title="Descartar Alterações">
          <p>Essa ação não poderá ser desfeita, os dados não serão salvos!</p>
          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setPopupCancelarCadastro(false)}>Cancelar</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => { setPopupCancelarCadastro(false); setPopupCadastro(false); }}>Descartar</button>
          </div>
        </Popup>
      )}

      {popupCancelarEdicao && (
        <Popup onClose={() => setPopupCancelarEdicao(false)} title="Descartar Dados?">
          <p>Essa ação não poderá ser desfeita, os dados não serão salvos!</p>
          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setPopupCancelarEdicao(false)}>Cancelar</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => { setPopupCancelarEdicao(false); setPopupCadastro(false); setPopupEditar(false); }}>Descartar</button>
          </div>
        </Popup>
      )}

      {/* MENU LATERAL */}
      <aside
        className={`fixed top-20 left-0 w-64 h-[75%] bg-white shadow-lg p-4 transition-all ${
          menuFiltro ? "left-0" : "-left-96"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Filtros</span>
          <button className="text-2xl" onClick={() => setMenuFiltro(false)}>✕</button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <select className="w-full p-2 border border-gray-300 rounded">
          <option>Disciplina</option>
        </select>
        <div className="mt-auto text-center">
          <button className="px-6 py-3 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white">Limpar</button>
        </div>
      </aside>
    </div>
  );
}

function Popup({ children, onClose, title }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
