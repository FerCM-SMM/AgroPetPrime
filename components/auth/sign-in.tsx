'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Email ou senha inválidos.');
      }
      toast.success('Login realizado com sucesso!');
      router.push('/perfil');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
          E-mail
        </Label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="seu@email.com"
          className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F]">
            Senha
          </Label>
        </div>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="••••••••"
          className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#12C0E0] hover:bg-[#0EA5E9] text-black font-extrabold text-sm py-3 rounded-full shadow-sm hover:shadow transition-all" 
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar na Conta'}
      </Button>
    </form>
  );
}
