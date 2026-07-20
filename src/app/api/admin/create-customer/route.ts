import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Requires service role key to create users and bypass RLS
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify caller is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_platform_admin')
      .eq('user_id', user.id)
      .single();

    if (!profile?.is_platform_admin) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const { email, fullName, password } = await req.json();

    if (!email || !password || !fullName) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      }
    });

    if (authError) {
      return new NextResponse(authError.message, { status: 400 });
    }

    const newUserId = authData.user.id;

    // The database trigger (`handle_new_user`) will automatically create the profile and account.
    // However, it runs asynchronously in the trigger. We need to wait for it or just directly set `has_lifetime_access`.
    // Let's poll for the profile to exist (max 5 tries, 500ms apart)
    let retries = 0;
    let newAccountId: string | null = null;
    while (retries < 5) {
      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .select('account_id')
        .eq('user_id', newUserId)
        .single();
      
      if (newProfile?.account_id) {
        newAccountId = newProfile.account_id;
        break;
      }
      await new Promise(r => setTimeout(r, 500));
      retries++;
    }

    if (!newAccountId) {
      return new NextResponse('Failed to find created account', { status: 500 });
    }

    // Set lifetime access
    const { error: updateError } = await supabaseAdmin
      .from('accounts')
      .update({ has_lifetime_access: true })
      .eq('id', newAccountId);

    if (updateError) {
      return new NextResponse('Failed to grant lifetime access', { status: 500 });
    }

    return NextResponse.json({ success: true, userId: newUserId });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
