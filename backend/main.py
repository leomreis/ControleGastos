from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from data.database import get_db, Base, engine
from data import models, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get(
        "ControleGastos_CORS", "http://localhost:5173").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/categorias", response_model=schemas.CategoriaOut)
def create_categoria(categoria: schemas.CategoriaIn, db=Depends(get_db)):
    db_categoria = models.Categoria(**categoria.model_dump())
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.get("/categorias", response_model=list[schemas.CategoriaOut])
def read_categorias(db=Depends(get_db)):
    categorias = db.query(models.Categoria).all()
    return categorias

@app.post("/gastos", response_model=schemas.GastoOut)
def create_gasto(gasto: schemas.GastoIn, db=Depends(get_db)):
    if not db.get(models.Categoria, gasto.categoria_id):
        raise HTTPException(status_code=400, detail="Categoria não encontrada")
    db_gasto = models.Gasto(**gasto.model_dump())
    db.add(db_gasto)
    db.commit()
    db.refresh(db_gasto)
    return db_gasto

@app.get("/gastos", response_model=list[schemas.GastoOut])
def read_gastos(db=Depends(get_db)):
    gastos = db.query(models.Gasto).all()
    return gastos

@app.put("/categorias/{id_categoria}", response_model=schemas.CategoriaOut)
def update_categoria(id_categoria: int, categoria: schemas.CategoriaIn, db=Depends(get_db)):
    db_categoria = db.get(models.Categoria, id_categoria)
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    for campo, valor in categoria.model_dump().items():
        setattr(db_categoria, campo, valor)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.delete("/categorias/{id_categoria}", status_code=204)
def delete_categoria(id_categoria: int, db=Depends(get_db)):
    db_categoria = db.get(models.Categoria, id_categoria)
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    if db.query(models.Gasto).filter_by(categoria_id=id_categoria).first():
        raise HTTPException(status_code=409, detail="Categoria possui gastos")
    db.delete(db_categoria)
    db.commit()


@app.delete("/dados", status_code=204)
def delete_todos_dados(db=Depends(get_db)):
    db.query(models.Gasto).delete()
    db.query(models.Categoria).delete()
    db.commit()
