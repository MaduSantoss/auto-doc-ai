import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('preview');

  const handleGenerate = async () => {
    if (!jsonInput.trim()) {
      setError('Por favor, insira um JSON válido para processar.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate', {
        title: title || "API Sem Nome",
        raw_json: JSON.parse(jsonInput)
      });
      
      setMarkdown(response.data.markdown);
      setView('preview');
    } catch (err) {
      console.error(err);
      setError('Erro na conexão ou JSON inválido. Verifique o formato ou a chave da API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-6 font-sans flex flex-col">
      {/* Header Proporcional - Otimizado */}
      <header className="max-w-400 w-full mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-6 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase">AI Documentation Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent leading-none">
            AUTO<span className="text-emerald-500">DOC</span><span className="text-violet-500">.</span>
          </h1>
        </div>
        <div className="hidden md:block border-l border-violet-500/30 pl-6 py-1">
          <p className="text-gray-500 text-[11px] font-medium leading-relaxed uppercase tracking-wider max-w-xs">
            Transformando JSON em guias técnicos de alto nível com Llama 3.3.
          </p>
        </div>
      </header>

      {/* Main Grid Proporcional - Otimizado */}
      <main className="max-w-400 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 grow">
        {/* Editor Side */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-card p-6 border border-white/5 rounded-3xl bg-white/2 backdrop-blur-xl flex flex-col h-full">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Project ID</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: AuthService"
                  className="w-full bg-white/3 border-b border-white/10 p-3 focus:border-emerald-500 outline-none transition-all text-base font-light"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Source JSON</label>
                <textarea 
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='Colar JSON aqui...'
                  className="w-full h-112.5 bg-black/20 border border-white/5 rounded-2xl p-5 font-mono text-xs focus:border-violet-500 outline-none transition-all resize-none scrollbar-custom"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 ${
                  loading ? 'bg-gray-800 opacity-50' : 'bg-white text-black hover:bg-emerald-500 hover:scale-[1.01] active:scale-95'
                }`}
              >
                {loading ? 'Processando IA...' : 'Gerar Documentação'}
              </button>
            </div>
            {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[10px] text-center uppercase font-bold tracking-tight">{error}</div>}
          </div>
        </section>

        {/* Preview Side */}
        <section className="lg:col-span-8">
          <div className="glass-card h-full min-h-162.5 border border-white/5 rounded-3xl bg-white/1 backdrop-blur-2xl flex flex-col overflow-hidden">
            <div className="flex items-center gap-6 px-8 py-4 border-b border-white/5 bg-white/2">
              <button 
                onClick={() => setView('preview')}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${view === 'preview' ? 'text-emerald-500 border-emerald-500' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                Preview
              </button>
              <button 
                onClick={() => setView('source')}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${view === 'source' ? 'text-violet-500 border-violet-500' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                Raw Markdown
              </button>
            </div>
            
            <div className="p-8 prose prose-invert max-w-none grow overflow-y-auto scrollbar-custom markdown-container">
              {markdown ? (
                view === 'preview' ? (
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                ) : (
                  <pre className="text-xs font-mono text-violet-300 bg-black/30 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap">
                    {markdown}
                  </pre>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                  <div className="h-px w-12 bg-white mb-4"></div>
                  <p className="text-[10px] uppercase tracking-[0.4em]">Aguardando Entrada JSON</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Visível */}
      <footer className="max-w-400 w-full mx-auto mt-8 py-6 border-t border-white/5 flex justify-between items-center opacity-80">
        <p className="text-[9px] tracking-[0.3em] font-bold text-gray-400">© 2026 AUTODOC ENGINE</p>
        <div className="h-1 w-1 bg-violet-500 rounded-full"></div>
        <p className="text-[9px] tracking-[0.3em] font-bold text-white uppercase">Full Stack Dev: Maria Eduarda Silva</p>
      </footer>
    </div>
  );
}

export default App;