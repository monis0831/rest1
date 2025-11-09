import { prisma } from "../lib/prisma";
export default async function Home(){
  let items = await prisma.recipe.findMany({ where: { available: true }, orderBy: { createdAt: "desc" } }).catch(()=>[]);
  return (<main style={{minHeight:'100vh',background:'#000',color:'#fff',padding:24}}>
    <h1 style={{fontSize:28, fontWeight:800}}>Rest1 is live ✅</h1>
    <p>Home route is working. Add dishes in <a href="/admin-login" style={{color:'#ef4444'}}>Admin</a>.</p>
    <div style={{marginTop:16, opacity:.8}}>{items.length} items found.</div>
  </main>);
}
