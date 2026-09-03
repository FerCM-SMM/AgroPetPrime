import { SignUp } from '@/components/auth/sign-up';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">
            AgroPet <span className="text-[#12c0e0]">Pr1me</span>
          </h1>
          <p className="text-gray-600">Create your account for easier shopping!</p>
        </div>
        <SignUp />
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#12c0e0] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
