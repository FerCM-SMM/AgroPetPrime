import { SignUp } from '@/components/auth/sign-up';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-[#FFFDF8] py-16 px-4">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#20241F]">
              AgroPet <span className="text-[#12C0E0]">Pr1me</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#20241F] mb-1">
            Criar sua Conta
          </h1>
          <p className="text-xs text-[#555C54]">Cadastre-se para acumular cashback e comprar com agilidade.</p>
        </div>
        <SignUp />
        <p className="text-center text-xs text-[#555C54] mt-6 pt-5 border-t border-[#EBE3D5]">
          Já possui uma conta cadastrada?{' '}
          <Link href="/login" className="text-[#1C4E47] font-bold hover:underline">
            Acessar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
