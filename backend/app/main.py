from fastapi import FastAPI,Depends,HTTPException,status,Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import logging,os
from .db import Base,engine,get_db
from .models import User
from .schemas import OTPRequest,OTPVerify,UserOut
from .auth import normalize_identifier,get_or_create_user,create_and_store_otp,verify_otp,issue_token,decode_token
Base.metadata.create_all(bind=engine)
app=FastAPI(title='Quran Audio Backend',version='0.1.0')
origins=os.getenv('CORS_ORIGINS','http://localhost:3000').split(',')
app.add_middleware(CORSMiddleware,allow_origins=[o.strip() for o in origins if o.strip()],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
logger=logging.getLogger('uvicorn');logger.setLevel(logging.INFO)
@app.post('/auth/request-otp')
def request_otp(payload:OTPRequest,db:Session=Depends(get_db)):
    id_type,value=normalize_identifier(payload.identifier)
    if not value: raise HTTPException(status_code=400,detail='identifier لازم است')
    user=get_or_create_user(db,id_type,value)
    code=create_and_store_otp(db,user)
    logger.info(f"[OTP] identifier={id_type}:{value} user_id={user.id} code={code}")
    return {'ok':True,'message':'OTP created. Check backend logs.'}
@app.post('/auth/verify-otp')
def verify(payload:OTPVerify,db:Session=Depends(get_db)):
    id_type,value=normalize_identifier(payload.identifier)
    if not value or not payload.code: raise HTTPException(status_code=400,detail='identifier و code لازم است')
    user=get_or_create_user(db,id_type,value)
    if not verify_otp(db,user,payload.code): raise HTTPException(status_code=400,detail='کد نامعتبر یا منقضی شده است')
    token=issue_token(user); return {'token':token}

def get_current_user(request:Request,db:Session=Depends(get_db))->User:
    auth=request.headers.get('Authorization')
    if not auth or not auth.startswith('Bearer '): raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='توکن لازم است')
    token=auth.split(' ',1)[1]
    try: uid=decode_token(token)
    except Exception: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='توکن نامعتبر')
    user=db.query(User).filter(User.id==uid).first()
    if not user: raise HTTPException(status_code=404,detail='کاربر یافت نشد')
    return user
@app.get('/me',response_model=UserOut)
def me(user:User=Depends(get_current_user)):
    return user
@app.get('/health')
def health():
    return {'ok': True}
