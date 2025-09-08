from pydantic import BaseModel,EmailStr,Field
from typing import Optional
class OTPRequest(BaseModel):
    identifier: str = Field(..., description='email یا شماره موبایل')
class OTPVerify(BaseModel):
    identifier: str
    code: str
class UserOut(BaseModel):
    id:int
    first_name: Optional[str]=None
    last_name: Optional[str]=None
    email: Optional[EmailStr]=None
    phone: Optional[str]=None
    created_at: str
    class Config:
        from_attributes=True
