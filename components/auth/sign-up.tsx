'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

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
      await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
      });
      router.push('/perfil');
    } catch (error) {
      alert('Error creating account.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Full name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Phone</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full bg-[#12c0e0] text-black hover:bg-[#0ea5e9]" disabled={loading}>
        {loading ? 'Creating...' : 'Create account'}
      </Button>
    </form>
  );
}
