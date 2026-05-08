import { DashboardLayout } from '@/components/layouts/dashboard-layout'

export default function RootDashboardLayout({ children }: { children: React.ReactNode }) {
  // In a real app, verify user is authenticated and potentially 
  // fetch all tenants they have access to.
  return <DashboardLayout>{children}</DashboardLayout>
}
