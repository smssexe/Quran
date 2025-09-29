from sqlalchemy import Column,Integer,String,DateTime,Boolean,ForeignKey,UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base
class User(Base):
    __tablename__='users'
    id=Column(Integer,primary_key=True,index=True)
    email=Column(String,unique=True,nullable=True,index=True)
    phone=Column(String,unique=True,nullable=True,index=True)
    first_name=Column(String,nullable=True)
    last_name=Column(String,nullable=True)
    created_at=Column(DateTime,default=datetime.utcnow)
    otps=relationship('OTPCode',back_populates='user')
class OTPCode(Base):
    __tablename__='otp_codes'
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey('users.id'),nullable=False,index=True)
    code_hash=Column(String,nullable=False)
    expires_at=Column(DateTime,nullable=False)
    consumed=Column(Boolean,default=False)
    created_at=Column(DateTime,default=datetime.utcnow)
    user=relationship('User',back_populates='otps')
    __table_args__=(UniqueConstraint('user_id','code_hash',name='uq_user_code'),)
