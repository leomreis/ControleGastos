from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from data.database import Base
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import NUMERIC

def agora():
    return datetime.now(timezone.utc)

class Categoria(Base):
    __tablename__ = "categorias"
    
    id_categoria = Column(Integer, primary_key=True)
    nome = Column(String(50), nullable=False)
    descricao = Column(String(200), nullable=True)
    created_at = Column(DateTime, nullable=False, default=agora)
    update_at = Column(DateTime, nullable=False, default=agora, onupdate=agora)

class Gasto(Base):
    __tablename__ = "gastos"
    
    id = Column(Integer, primary_key=True)
    descricao = Column(String(200), nullable=False)
    valor = Column(NUMERIC(10, 2), default=0.00, nullable=False)
    data = Column(DateTime, nullable=False)
    categoria_id = Column(Integer, ForeignKey("categorias.id_categoria"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=agora)
    update_at = Column(DateTime, nullable=False, default=agora, onupdate=agora)

class User(Base):
    __tablename__ = "users"
    
    id_user = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(200), nullable=False)
    created_at = Column(DateTime, nullable=False, default=agora)
    update_at = Column(DateTime, nullable=False, default=agora, onupdate=agora)