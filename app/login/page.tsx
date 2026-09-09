import { SignIn } from '@/components/auth/sign-in';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#FFFDF8] py-16 px-4">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#20241F]">
              AgroPet <span className="text-[#12C0E0]">Pr1me</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#20241F] mb-1">
            Bem-vindo de volta
          </h1>
          <p className="text-xs text-[#555C54]">Acesse sua conta para gerenciar seus pedidos e cashback.</p>
        </div>
        <SignIn />
        <p className="text-center text-xs text-[#555C54] mt-6 pt-5 border-t border-[#EBE3D5]">
          Ainda não tem uma conta?{' '}
          <Link href="/register" className="text-[#1C4E47] font-bold hover:underline">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
    </main>
  );
}
