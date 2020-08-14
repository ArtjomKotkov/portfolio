#from sqlalchemy import Column, ...
from portfolio import engine
Base = engine.app.db.Base
# Use Base us declarative_base, for class inheritance.