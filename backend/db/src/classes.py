from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from flask_login import UserMixin

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, unique=False, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    tasks = relationship('Task', back_populates='user', cascade='all, delete-orphan')


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='tasks')