import { SignIn } from '@/components/auth/sign-in';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#000000] mb-2">
            AgroPet <span className="text-[#12c0e0]">Pr1me</span>
          </h1>
          <p className="text-gray-600">Welcome back! Sign in to continue.</p>
        </div>
        <SignIn />
        <p className="text-center text-sm text-gray-500 mt-6">
          Dont have an account?{' '}
          <Link href="/register" className="text-[#12c0e0] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </main>
  );
}
