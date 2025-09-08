from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime  # ← اضافه

class UserOut(BaseModel):
    id: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    created_at: datetime  # ← قبلاً str بود، الان datetime

    class Config:
        from_attributes = True
