"use client"
import React, { useState } from "react";

function App() {
  const [popupAtivo, setPopupAtivo] = useState(null);
  const [menuFiltroAtivo, setMenuFiltroAtivo] = useState(false);

  const abrirPopup = (id) => setPopupAtivo(id);
  const fecharPopup = () => setPopupAtivo(null);
  const toggleFiltro = () => setMenuFiltroAtivo(!menuFiltroAtivo);

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <header className="fixed top-0 left-0 right-0 h-20 bg-blue-900 text-white flex justify-between items-center px-6 rounded-b-md z-10">
        <h2 className="text-lg md:text-xl font-semibold">Projeto Avalia - Área do Professor</h2>
        <div className="flex items-center gap-4 text-lg">
          <span>João da Silva Cunha</span>
          <button
            className="text-white text-xl cursor-pointer"
            onClick={() => abrirPopup("sair")}
          >
            ⎋
          </button>
        </div>
      </header>

      <main className="pt-28 px-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Pesquisar questão..."
              className="w-[600px] p-2 rounded border border-gray-300 focus:outline-none"
            />
            <button
              className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition"
              onClick={toggleFiltro}
            >
              ☰ Filtros
            </button>
          </div>
          <div className="flex gap-4">
            <button className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition">
              Gerar prova
            </button>
            <button
              className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition"
              onClick={() => abrirPopup("cadastro")}
            >
              Adicionar questão
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <li
              key={i}
              className="bg-white p-2 rounded flex justify-between items-center shadow-sm"
            >
              Questão - (Disciplina)
              <button
                className="ml-auto text-lg cursor-pointer hover:opacity-70"
                onClick={() => abrirPopup("editar")}
              >
                ✎
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* POPUPS */}
      {popupAtivo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          {popupAtivo === "cadastro" && (
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Cadastrar questão</h3>
                <label className="flex flex-col gap-1">
                  Disciplina:
                  <select className="p-2 border rounded w-full">
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>História</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  Enunciado:
                  <textarea
                    className="p-2 border rounded min-h-[90px] resize-y"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold">Respostas:</h4>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div className="grid grid-cols-[30px_1fr] items-center gap-2" key={i}>
                    <input type="checkbox" className="w-5 h-5 rounded" />
                    <input type="text" placeholder={`Resposta ${i + 1}`} className="p-2 border rounded w-full" />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => abrirPopup("cancelarCadastro")}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded">
                  Salvar
                </button>
              </div>
            </div>
          )}

          {popupAtivo === "editar" && (
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Editar questão</h3>
                <label className="flex flex-col gap-1">
                  Disciplina:
                  <select className="p-2 border rounded w-full">
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>História</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  Enunciado:
                  <textarea
                    className="p-2 border rounded min-h-[90px] resize-y"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold">Respostas:</h4>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div className="grid grid-cols-[30px_1fr] items-center gap-2" key={i}>
                    <input type="checkbox" className="w-5 h-5 rounded" />
                    <input type="text" placeholder={`Resposta ${i + 1}`} className="p-2 border rounded w-full" />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => abrirPopup("cancelarEdicao")}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded">
                  Salvar
                </button>
              </div>
            </div>
          )}

          {popupAtivo === "sair" && (
            <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Sair da conta</h3>
              <p className="mb-6">Tem certeza que deseja sair?</p>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={fecharPopup}>
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Sair</button>
              </div>
            </div>
          )}

          {(popupAtivo === "cancelarEdicao" || popupAtivo === "cancelarCadastro") && (
            <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Descartar Alterações</h3>
              <p className="mb-6">
                Essa ação não poderá ser desfeita, os dados não serão salvos!
              </p>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={fecharPopup}>
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={fecharPopup}>
                  Descartar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MENU LATERAL */}
      <aside
        className={`fixed top-20 left-0 w-64 h-3/4 bg-white p-5 shadow-lg flex flex-col transition-transform duration-300 ${
          menuFiltroAtivo ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Filtros</span>
          <button className="text-2xl text-blue-900 font-bold" onClick={toggleFiltro}>
            ✕
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <select className="w-full p-2 border border-gray-300 rounded mb-4">
          <option>Disciplina</option>
        </select>
        <button className="mt-auto w-full p-3 border-2 border-blue-900 text-blue-900 rounded hover:bg-blue-900 hover:text-white transition">
          Limpar
        </button>
      </aside>
    </div>
  );
}

export default App;
