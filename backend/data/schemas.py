from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field  

class GastoIn(BaseModel):
    descricao: str = Field(min_length=1, max_length=200, examples=["Aluguel"])
    valor: Decimal = Field(gt=0, examples=[1500.00])
    data: datetime = Field(examples=["2023-03-15T00:00:00"])
    categoria_id: int
    
class GastoOut(GastoIn):
    id: int
    created_at: datetime 
    update_at: datetime 
    model_config = {"from_attributes": True}
    
class CategoriaIn(BaseModel):
    nome: str = Field(min_length=1, max_length=50, examples=["Moradia"])
    descricao: str | None = Field(default=None, max_length=200, examples=["Despesas com moradia"])

class CategoriaOut(CategoriaIn):
    id_categoria: int 
    created_at: datetime 
    update_at: datetime 
    model_config = {"from_attributes": True}