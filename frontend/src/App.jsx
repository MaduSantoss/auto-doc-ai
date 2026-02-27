import { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function App() {
  const [title, setTitle] = useState('')
  const [jsonInput, setJsonInput] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  const handleGenerate = async () => {
    if (!jsonInput.trim()) return alert("Por favor, cole um JSON primeiro!");
    try { JSON.parse(jsonInput); } catch (e) { return alert("JSON inválido!"); }
    
    setLoading(true)
    try {
      const response = await axios.post('http://127.0.0.1:8000/generate', {
        title: title || "API Sem Nome",
        raw_json: JSON.parse(jsonInput) 
      })
      setMarkdown(response.data.markdown)
    } catch (error) {
      alert("Erro na conexão.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b10] text-slate-200 font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 p-6 md:p-12 flex flex-col min-h-screen max-w-400 mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-8 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-500 uppercase tracking-[0.3em] text-[10px] font-black">AI Documentation Engine</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              AUTO<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-emerald-400 font-light">DOC.</span>
            </h1>
          </div>
          <p className="text-slate-500 max-w-xs text-sm leading-relaxed border-l border-slate-800 pl-4 uppercase tracking-tighter">
            Gerador de documentação técnica inteligente para APIs RESTful, transformando JSON em guias claros e profissionais.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch mb-8">
          
          <section className="lg:col-span-5 flex flex-col gap-6 group">
            <div className="bg-[#11131a] border border-white/5 p-8 rounded-4xl flex flex-col flex-1 shadow-2xl transition-all group-hover:border-emerald-500/20">
              <div className="space-y-6 flex flex-col h-full">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">Project ID</label>
                  <input 
                    className="w-full bg-transparent border-b border-slate-800 py-2 focus:border-emerald-500 outline-none transition-all text-xl font-light placeholder:text-slate-700"
                    placeholder="API Name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col flex-1 relative">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">Source JSON</label>
                  <textarea 
                    className="w-full bg-[#0d0e14] border border-slate-800/50 p-6 rounded-2xl flex-1 font-mono text-sm focus:border-emerald-500/50 outline-none transition-all resize-none scrollbar-none shadow-inner"
                    placeholder='{ "input": "data" }'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-emerald-400 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 disabled:bg-slate-800 disabled:text-slate-500 flex justify-center items-center"
                >
                  {loading ? "Processando..." : "Gerar Documentação"}
                </button>
              </div>
            </div>
          </section>

          <section className="lg:col-span-7 flex flex-col">
            <div className="bg-[#11131a]/50 backdrop-blur-xl border border-white/5 rounded-4xl flex flex-col h-full shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-emerald-500"></div>
              
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-4">
                    <button onClick={() => setShowRaw(false)} className={`text-[10px] font-black tracking-widest uppercase transition-all ${!showRaw ? 'text-emerald-500 underline underline-offset-8' : 'text-slate-500 hover:text-white'}`}>Preview</button>
                    <button onClick={() => setShowRaw(true)} className={`text-[10px] font-black tracking-widest uppercase transition-all ${showRaw ? 'text-emerald-500 underline underline-offset-8' : 'text-slate-500 hover:text-white'}`}>Source</button>
                  </div>
                  
                  {markdown && (
                    <div className="flex gap-4">
                      <button onClick={() => navigator.clipboard.writeText(markdown)} className="text-[10px] font-black hover:text-emerald-400 transition-colors uppercase tracking-widest">Copy</button>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar selection:bg-emerald-500/30">
                  {markdown ? (
                    <div className={showRaw ? "font-mono text-xs text-emerald-300/80 leading-relaxed" : "prose prose-invert prose-emerald max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-400 prose-strong:text-emerald-400"}>
                      {showRaw ? markdown : <ReactMarkdown>{markdown}</ReactMarkdown>}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                      <div className="w-12 h-px bg-slate-500"></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Input</p>
                      <div className="w-12 h-px bg-slate-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App