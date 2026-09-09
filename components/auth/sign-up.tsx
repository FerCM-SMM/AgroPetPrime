'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
      });
      if (!res.ok) {
        throw new Error('Falha ao cadastrar. Verifique os dados informados.');
      }
      toast.success('Conta criada com sucesso!');
      router.push('/perfil');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
          Nome completo
        </Label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          placeholder="Seu nome completo"
          className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
        />
      </div>
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
        <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
          WhatsApp / Telefone com DDD
        </Label>
        <Input 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
          placeholder="(15) 99999-9999"
          className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
          Senha de acesso
        </Label>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="Mínimo 6 caracteres"
          className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#12C0E0] hover:bg-[#0EA5E9] text-black font-extrabold text-sm py-3 rounded-full shadow-sm hover:shadow transition-all" 
        disabled={loading}
      >
        {loading ? 'Criando conta...' : 'Concluir Cadastro'}
      </Button>
    </form>
  );
}
