"use client"
import React, { useState } from "react";

function App() {
  const [questoes, setQuestoes] = useState([
    { id: 1, disciplina: "Matemática", enunciado: "Questão 1", respostas: ["", "", "", "", ""] },
    { id: 2, disciplina: "Português", enunciado: "Questão 2", respostas: ["", "", "", "", ""] },
    { id: 3, disciplina: "Estatística", enunciado: "Questão 3", respostas: ["", "", "", "", ""] },
    { id: 4, disciplina: "Administração", enunciado: "Questão 4", respostas: ["", "", "", "", ""] },
    { id: 5, disciplina: "Comunicação e Expressão", enunciado: "Questão 5", respostas: ["", "", "", "", ""] },
    { id: 6, disciplina: "Contabilidade", enunciado: "Questão 6", respostas: ["", "", "", "", ""] },
  ]);

  const [popupAtivo, setPopupAtivo] = useState<string | null>(null);
  const [menuFiltroAtivo, setMenuFiltroAtivo] = useState(false);
  const [questaoAtual, setQuestaoAtual] = useState({ disciplina: "", enunciado: "", respostas: ["", "", "", "", ""] });

  const abrirPopup = (id: string, questao: any = null) => {
    setPopupAtivo(id);
    if (questao) setQuestaoAtual({ ...questao });
    else setQuestaoAtual({ disciplina: "", enunciado: "", respostas: ["", "", "", "", ""] });
  };
  const fecharPopup = () => setPopupAtivo(null);
  const toggleFiltro = () => setMenuFiltroAtivo(!menuFiltroAtivo);

  const handleChange = (
    field: string,
    value: string,
    index: number | null = null
  ) => {
    if (field === "respostas") {
      const novasRespostas = [...questaoAtual.respostas];
      if (index !== null) novasRespostas[index] = value;
      setQuestaoAtual({ ...questaoAtual, respostas: novasRespostas });
    } else {
      setQuestaoAtual({ ...questaoAtual, [field]: value });
    }
  };

  const salvarQuestao = () => {
    if (questaoAtual.id) {
      setQuestoes(questoes.map(q => (q.id === questaoAtual.id ? questaoAtual : q)));
    } else {
      setQuestoes([...questoes, { ...questaoAtual, id: Date.now() }]);
    }
    fecharPopup();
  };

  const descartarAlteracoes = () => {
    setQuestaoAtual({ disciplina: "", enunciado: "", respostas: ["", "", "", "", ""] });
    fecharPopup();
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <header className="fixed top-0 left-0 right-0 h-20 bg-blue-900 text-white flex justify-between items-center px-6 rounded-b-md z-10">
        <h2 className="text-lg md:text-xl font-semibold">Projeto Avalia - Área do Professor</h2>
        <div className="flex items-center gap-4 text-lg">
          <span>João da Silva Cunha</span>
          <button className="text-white text-xl cursor-pointer" onClick={() => abrirPopup("sair")}>⎋</button>
        </div>
      </header>

      <main className="pt-28 px-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Pesquisar questão..." className="w-[600px] p-2 rounded border border-gray-300 focus:outline-none" />
            <button className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition" onClick={toggleFiltro}>☰ Filtros</button>
          </div>
          <div className="flex gap-4">
            <button className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition">Gerar prova</button>
            <button className="border-2 border-blue-900 text-blue-900 px-3 py-1 rounded hover:bg-blue-900 hover:text-white transition" onClick={() => abrirPopup("cadastro")}>Adicionar questão</button>
          </div>
        </div>

        <ul className="space-y-2">
          {questoes.map((q) => (
            <li key={q.id} className="bg-white p-2 rounded flex justify-between items-center shadow-sm">
              {q.enunciado} - ({q.disciplina})
              <button className="ml-auto text-lg cursor-pointer hover:opacity-70" onClick={() => abrirPopup("editar", q)}>✎</button>
            </li>
          ))}
        </ul>
      </main>

      {/* POPUPS */}
      {popupAtivo && (
        <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center z-50 p-4">
          {(popupAtivo === "cadastro" || popupAtivo === "editar") && (
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{popupAtivo === "cadastro" ? "Cadastrar questão" : "Editar questão"}</h3>
                <label className="flex flex-col gap-1">
                  Disciplina:
                  <select className="p-2 border rounded w-full" value={questaoAtual.disciplina} onChange={(e) => handleChange("disciplina", e.target.value)}>
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>Estatística</option>
                    <option>Administração</option>
                    <option>Comunicação e Expressão</option>
                    <option>Contabilidade</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  Enunciado:
                  <textarea className="p-2 border rounded min-h-[90px] resize-y" value={questaoAtual.enunciado} onChange={(e) => handleChange("enunciado", e.target.value)} />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold">Respostas:</h4>
                {questaoAtual.respostas.map((r, i) => (
                  <div className="grid grid-cols-[30px_1fr] items-center gap-2" key={i}>
                    <input type="checkbox" className="w-5 h-5 rounded" />
                    <input type="text" placeholder={`Resposta ${i + 1}`} className="p-2 border rounded w-full" value={r} onChange={(e) => handleChange("respostas", e.target.value, i)} />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={descartarAlteracoes}>Cancelar</button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={salvarQuestao}>Salvar</button>
              </div>
            </div>
          )}

          {popupAtivo === "sair" && (
            <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Sair da conta</h3>
              <p className="mb-6">Tem certeza que deseja sair?</p>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={fecharPopup}>Cancelar</button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => window.location.href = "/"}
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MENU LATERAL */}
      <aside className={`fixed top-20 left-0 w-64 h-3/4 bg-white p-5 shadow-lg flex flex-col transition-transform duration-300 ${menuFiltroAtivo ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Filtros</span>
          <button className="text-2xl text-blue-900 font-bold" onClick={toggleFiltro}>✕</button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <select className="w-full p-2 border border-gray-300 rounded mb-4">
          <option>Disciplina</option>
        </select>
        <button className="mt-auto w-full p-3 border-2 border-blue-900 text-blue-900 rounded hover:bg-blue-900 hover:text-white transition">Limpar</button>
      </aside>
    </div>
  );
}

export default App;
