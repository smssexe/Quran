import hashlib,os
from datetime import datetime,timedelta
from sqlalchemy.orm import Session
from .models import User,OTPCode
import jwt
JWT_SECRET=os.getenv('JWT_SECRET','dev-secret-change-me')
JWT_ALG='HS256'
OTP_TTL_MIN=int(os.getenv('OTP_TTL_MIN','5'))
TOKEN_TTL_DAYS=int(os.getenv('TOKEN_TTL_DAYS','7'))

def normalize_identifier(identifier:str):
    s=identifier.strip()
    if '@' in s: return 'email', s.lower()
    phone=''.join(ch for ch in s if ch.isdigit() or ch=='+')
    return 'phone', phone

def get_or_create_user(db:Session,id_type:str,value:str)->User:
    if id_type=='email':
        user=db.query(User).filter(User.email==value).first()
        if not user:
            user=User(email=value); db.add(user); db.commit(); db.refresh(user)
        return user
    else:
        user=db.query(User).filter(User.phone==value).first()
        if not user:
            user=User(phone=value); db.add(user); db.commit(); db.refresh(user)
        return user

def hash_code(code:str)->str: return hashlib.sha256(code.encode()).hexdigest()

def generate_otp_code(n:int=6)->str:
    import random
    return ''.join(str(random.randint(0,9)) for _ in range(n))

def create_and_store_otp(db:Session,user:User)->str:
    code=generate_otp_code(6)
    code_h=hash_code(code)
    exp=datetime.utcnow()+timedelta(minutes=OTP_TTL_MIN)
    otp=OTPCode(user_id=user.id,code_hash=code_h,expires_at=exp)
    db.add(otp); db.commit()
    return code

def verify_otp(db:Session,user:User,code:str)->bool:
    code_h=hash_code(code)
    now=datetime.utcnow()
    otp=db.query(OTPCode).filter(OTPCode.user_id==user.id,OTPCode.code_hash==code_h,OTPCode.consumed==False,OTPCode.expires_at>=now).order_by(OTPCode.created_at.desc()).first()
    if not otp: return False
    otp.consumed=True; db.add(otp); db.commit(); return True

def issue_token(user:User)->str:
    payload={'sub':str(user.id),'exp':datetime.utcnow()+timedelta(days=TOKEN_TTL_DAYS),'scope':'user'}
    return jwt.encode(payload,JWT_SECRET,algorithm=JWT_ALG)

def decode_token(token:str)->int:
    data=jwt.decode(token,JWT_SECRET,algorithms=[JWT_ALG])
    return int(data['sub'])
