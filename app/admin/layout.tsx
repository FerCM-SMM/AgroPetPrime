export const dynamic = 'force-dynamic';

import { Sidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Guard temporário desabilitado para MVP — Fase 4 implementará Supabase Auth real
  // TODO: migrar para middleware com verificação de role 'admin'
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
