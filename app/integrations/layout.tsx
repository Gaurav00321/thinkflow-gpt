import { ReactNode } from 'react';

export default function IntegrationsLayout({ children }: { children: ReactNode }) {
  // We can add integration-level breadcrumbs or top-level wrappers here in the future
  return (
    <div className="integrations-wrapper w-full bg-slate-50 min-h-screen">
      {children}
    </div>
  );
}
