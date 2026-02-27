# 🛸 AutoDoc AI — Smart API Documentation Engine

**AutoDoc AI** é uma plataforma de alto desempenho projetada para transformar estruturas JSON brutas em documentações técnicas profissionais de forma instantânea. Utilizando engenharia de prompts avançada e o modelo **Llama 3.3 (via Groq Cloud)**, o sistema automatiza a inferência de tipos, gera exemplos de comandos cURL e sugere tratamentos de erro de forma semântica.

---

## 💎 Design & UX

O projeto adota uma estética **Cyber-Glassmorphism**, focada em:

* **Interface Futurista**: Paleta de cores baseada em tons de Esmeralda e Violeta sobre um fundo escuro profundo.
* **Responsividade**: Layout adaptável para telas móveis e desktop.
* **Real-time Feedback**: Renderização dinâmica de Markdown com suporte a tabelas e blocos de código.

---

## 🛠️ Arquitetura Técnica (Unificada)

Diferente de arquiteturas tradicionais, este projeto utiliza um modelo **Serverless Monorepo**, otimizado para performance e escalabilidade zero-cost:

* **Frontend**: Desenvolvido com **Vite + React**, focado em renderização rápida e UX fluida.
* **Backend (API)**: Construído com **FastAPI**, operando como **Vercel Serverless Functions**. Isso elimina a latência de hibernação (cold start) comum em serviços gratuitos como o Render.
* **Inteligência Artificial**: Integração direta com a API da **Groq Cloud** para processamento de linguagem natural com latência ultra-baixa.
* **Segurança**: Implementação de **Same-Origin Policy** e gerenciamento de segredos via variáveis de ambiente, protegendo chaves sensíveis como a `GROQ_API_KEY`.

---

## 🚀 Como Executar Localmente

### **Pré-requisitos**

* Python 3.10+
* Node.js 18+
* Groq API Key

### **Passo a Passo**

1. **Clonar o repositório:**
```bash
git clone https://github.com/MaduSantoss/auto-doc-ai
cd auto-doc-ai

```


2. **Configurar o Backend:**
```bash
cd api
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate no Windows
pip install -r requirements.txt
# Crie um arquivo .env com sua GROQ_API_KEY

```


3. **Configurar o Frontend:**
```bash
cd ../frontend
npm install
npm run dev

```



---

## 🧠 Desafios de Engenharia Superados

* **Migração de Infraestrutura**: Transição de um modelo de servidor persistente (Render) para arquitetura Serverless (Vercel) para garantir disponibilidade 24/7 sem hibernação.
* **Consistência de Dados**: Refinamento de prompts para garantir que o modelo identifique formatos complexos como UUIDs, Datas ISO8601 e URLs em JSONs dinâmicos.
* **Otimização de Build**: Configuração de scripts de build personalizados para gerenciar dependências de Frontend e Backend em um único fluxo de CI/CD.

---

## 📬 Contato

Desenvolvido com foco em qualidade técnica por **Maria Eduarda Silva**.

---
