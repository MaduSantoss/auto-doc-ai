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

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate', {
        title: title || "API Sem Nome",
        raw_json: JSON.parse(jsonInput)
      });
      
      setMarkdown(response.data.markdown);
    } catch (err) {
      console.error(err);
      setError('Erro na conexão. Verifique o formato do JSON ou a chave da API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-8 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.3em] text-emerald-500 uppercase">AI Documentation Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            AUTO<span className="text-emerald-500">DOC</span><span className="text-violet-500">.</span>
          </h1>
        </div>
        <div className="max-w-md text-right hidden md:block">
          <p className="text-gray-500 text-sm leading-relaxed border-r-2 border-violet-500/30 pr-4">
            GERADOR DE DOCUMENTAÇÃO TÉCNICA INTELIGENTE PARA APIS RESTFUL, TRANSFORMANDO JSON EM GUIAS CLAROS E PROFISSIONAIS.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 border border-white/5 rounded-3xl bg-white/2 backdrop-blur-xl">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Project ID</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: AuthApi, PaymentGateway..."
                  className="w-full bg-white/3 border-b border-white/10 p-4 focus:border-emerald-500 outline-none transition-all text-lg font-light"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Source JSON</label>
                <textarea 
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"input": "user"}'
                  className="w-full h-80 bg-white/3 border border-white/5 rounded-2xl p-6 font-mono text-sm focus:border-violet-500 outline-none transition-all resize-none scrollbar-custom"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black tracking-widest uppercase transition-all duration-500 group relative overflow-hidden ${
                  loading ? 'bg-gray-800' : 'bg-white text-black hover:bg-emerald-500 hover:scale-[1.02]'
                }`}
              >
                <span className="relative z-10">{loading ? 'Processando...' : 'Gerar Documentação'}</span>
              </button>
            </div>
          </div>
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs text-center">{error}</div>}
        </section>

        {/* Preview Side */}
        <section className="lg:col-span-7">
          <div className="glass-card h-full min-h-150 border border-white/5 rounded-3xl bg-white/1 backdrop-blur-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b-2 border-emerald-500 pb-1">Preview</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors cursor-pointer pb-1">Source</span>
              </div>
            </div>
            
            <div className="p-8 prose prose-invert max-w-none grow overflow-y-auto scrollbar-custom">
              {markdown ? (
                <ReactMarkdown>{markdown}</ReactMarkdown>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting Input</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-20 py-8 border-t border-white/5 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all">
        <p className="text-[10px] tracking-widest font-bold">© 2026 AUTODOC ENGINE</p>
        <p className="text-[10px] tracking-widest font-bold">BY MARIA EDUARDA SILVA</p>
      </footer>
    </div>
  );
}

export default App;