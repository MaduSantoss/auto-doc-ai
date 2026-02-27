import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
from pydantic import BaseModel

# Variáveis de ambiente
load_dotenv()

# Cliente Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI(
    title="Auto-Doc AI API",
    description="Backend inteligente para geração de documentação técnica via Llama 3.3",
    version="1.0.0"
)

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    api_key_status = "Configurada ✅" if os.getenv("GROQ_API_KEY") else "Faltando ❌"
    
    return {
        "app": "Auto-Doc AI Engine",
        "version": "1.0.0",
        "status": "Online",
        "integrations": {
            "groq_api": api_key_status,
            "model": "llama-3.3-70b-versatile"
        },
        "endpoints": {
            "generate": "/generate (POST)",
            "docs": "/docs (Swagger UI)"
        },
        "author": "Maria Eduarda Silva"
    }

class DocRequest(BaseModel):
    title: str
    raw_json: dict

@app.post("/generate")
async def generate_doc(request: DocRequest):
    prompt = f"""
    Aja como um Arquiteto de Software e Technical Writer Sênior. 
    Analise o JSON da API '{request.title}': {request.raw_json}
    
    Instruções Obrigatórias:
    1. Identifique se as strings são formatos específicos (Email, UUID, ISO8601/Data, URL, etc).
    2. Crie uma tabela Markdown com as colunas: Campo, Tipo de Dado, Exemplo e Descrição Sugerida.
    3. Adicione uma seção de 'Exemplo de Comando cURL' para uma requisição POST.
    4. Adicione uma seção de 'Tratamento de Erros' sugerindo códigos 400 e 401 se aplicável.
    5. O tom deve ser profissional e técnico.
    
    Responda apenas em Markdown.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": "Você é um especialista em documentação de APIs que gera apenas Markdown puro."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2, 
        )
        return {"markdown": completion.choices[0].message.content}
        
    except Exception as e:
        print(f"Erro no processamento: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao processar com a IA.")