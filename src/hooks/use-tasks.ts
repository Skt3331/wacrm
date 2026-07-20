import { useCallback, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export interface Task {
  id: string;
  account_id: string;
  user_id: string;
  contact_id?: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'completed';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export function useTasks(contactId?: string) {
  const supabase = createClient();
  const { accountId, profile } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Tasks'); // Optional: fallback to generic text if not found

  const fetchTasks = useCallback(async () => {
    if (!accountId) return;
    setLoading(true);

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('account_id', accountId)
      .order('due_date', { ascending: true, nullsFirst: false });

    if (contactId) {
      query = query.eq('contact_id', contactId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  }, [accountId, contactId, supabase]);

  const addTask = async (task: Partial<Task>) => {
    if (!accountId || !profile) return null;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        account_id: accountId,
        user_id: profile.user_id,
        contact_id: task.contact_id || contactId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
      return null;
    }

    setTasks(prev => [...prev, data].sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }));
    toast.success('Task created successfully');
    return data;
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
      return null;
    }

    setTasks(prev => prev.map(t => t.id === taskId ? data : t));
    return data;
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
      return false;
    }

    setTasks(prev => prev.filter(t => t.id !== taskId));
    toast.success('Task deleted');
    return true;
  };

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
