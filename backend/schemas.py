from pydantic import BaseModel
from typing import Dict, Any, Optional

class DocRequest(BaseModel):
    title: str
    description: Optional[str] = "Sem descrição"
    raw_json: Dict[str, Any]