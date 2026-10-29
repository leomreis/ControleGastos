import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# O driver instalado é o psycopg2; sem isso o SQLAlchemy 2.1 tenta o psycopg v3
DATABASE_URL = os.environ["DATABASE_URL"].replace(
    "postgres://", "postgresql://", 1
).replace("postgresql://", "postgresql+psycopg2://", 1)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker( autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()