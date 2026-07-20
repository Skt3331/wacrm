import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCustomerForm } from '@/components/admin/create-customer-form';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_platform_admin')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_platform_admin) {
    redirect('/dashboard');
  }

  // Fetch all accounts
  const { data: accounts } = await supabase
    .from('accounts')
    .select(`
      id, 
      name, 
      has_lifetime_access, 
      created_at,
      profiles (
        email, full_name
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Admin</h1>
        <p className="text-muted-foreground mt-2">
          Manage customers, view accounts, and manually provision lifetime access.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Provisioning</CardTitle>
              <CardDescription>
                Create a new customer account with lifetime access (bypasses Stripe subscription).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateCustomerForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Accounts</CardTitle>
              <CardDescription>
                Total accounts on the platform: {accounts?.length || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Account Name</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Access</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground text-right">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {accounts?.map((acc: any) => (
                      <tr key={acc.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <p className="font-medium">{acc.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {acc.profiles?.[0]?.email || 'No email'}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {acc.has_lifetime_access ? (
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                              Lifetime / Manual
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
                              Stripe Managed
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {new Date(acc.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {!accounts?.length && (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                          No accounts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
