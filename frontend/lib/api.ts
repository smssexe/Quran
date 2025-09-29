export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';
export async function api(method:string, path:string, body?:any, token?:string){
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{}) },
    body: body?JSON.stringify(body):undefined,
  });
  if(!res.ok){ const text = await res.text(); throw new Error(text||`HTTP ${res.status}`); }
  return res.json();
}
