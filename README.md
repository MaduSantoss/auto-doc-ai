# 🛸 AutoDoc AI — Smart API Documentation

**AutoDoc AI** é uma plataforma de alto desempenho que transforma estruturas JSON brutas em documentações técnicas profissionais em Markdown instantaneamente. O sistema utiliza Engenharia de Prompts avançada com o modelo **Llama 3.3 (via Groq Cloud)** para inferir semântica, tipos de dados e gerar exemplos de comandos cURL.

---

## 💎 Design & UI

O projeto foge do comum com uma estética **Cyber-Glassmorphism**, focada em:

* **Neon-Pastel Palette**: Identidade visual moderna em tons de Esmeralda e Violeta.
* **Responsividade Total**: Experiência fluida entre desktop e dispositivos móveis.
* **UX Otimizada**: Preview em tempo real com renderização de Markdown dinâmico.

---

## 🛠️ Arquitetura Técnica

### **Frontend**

* **Vite + React**: Interface ultra-rápida e componentizada.
* **Axios**: Gerenciamento de requisições assíncronas para o backend em produção.
* **React Markdown**: Conversão imediata da resposta da IA em elementos visuais.

### **Backend**

* **FastAPI (Python)**: API robusta com validação de dados via Pydantic.
* **Groq SDK**: Integração de LLM com baixíssima latência para processamento de texto.
* **CORS Security**: Middleware configurado para comunicação segura entre domínios (Vercel/Render).

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**

* Python 3.10+
* Node.js 18+
* Chave de API da Groq Cloud

### **Passo a Passo**

1. **Clonar o repositório:**
```bash
git clone https://github.com/MaduSantoss/auto-doc-ai
cd auto-doc-ai

```


2. **Configurar o Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate no Windows
pip install -r requirements.txt
# Crie um .env com sua GROQ_API_KEY
python main.py

```


3. **Configurar o Frontend:**
```bash
cd ../frontend
npm install
npm run dev

```

---

## 🧠 Desafios Superados

* **Gerenciamento de CORS**: Implementação de políticas seguras para permitir a comunicação entre Vercel e Render.
* **Estruturação Monorepo**: Organização eficiente de pastas para deploy independente de serviços.
* **Prompt Engineering**: Refinamento das instruções do sistema para garantir que a IA identifique formatos como UUID, Datas ISO e URLs com precisão.

---


## 📬 Contato

Desenvolvido com 💜 por **Maria Eduarda Silva**.
