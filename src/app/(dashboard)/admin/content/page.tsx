"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  is_published: boolean;
};

export default function AdminContentPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error('Failed to fetch posts');
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  const handleSave = async () => {
    if (!editingPost) return;
    
    if (editingPost.id) {
      // Update
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt,
          content: editingPost.content,
          author: editingPost.author,
          is_published: editingPost.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id);
        
      if (error) {
        toast.error('Failed to update post');
      } else {
        toast.success('Post updated');
        setEditingPost(null);
        fetchPosts();
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt,
          content: editingPost.content,
          author: editingPost.author,
          is_published: editingPost.is_published,
          published_at: editingPost.is_published ? new Date().toISOString() : null,
        });
        
      if (error) {
        toast.error('Failed to create post');
      } else {
        toast.success('Post created');
        setEditingPost(null);
        fetchPosts();
      }
    }
  };

  const handleCreateNew = () => {
    setEditingPost({
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'WaCRM Team',
      is_published: false,
    });
  };

  if (loading) return <div className="p-8">Loading CMS...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground mt-1">Manage blog posts and dynamic marketing pages.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-whatsapp text-slate-950 hover:bg-neon-green">
          <Plus className="mr-2 h-4 w-4" /> New Blog Post
        </Button>
      </div>

      {editingPost ? (
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{editingPost.id ? 'Edit Post' : 'Create New Post'}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={editingPost.is_published}
                  onCheckedChange={(checked) => setEditingPost({...editingPost, is_published: checked})}
                />
                <Label>Published</Label>
              </div>
              <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
              <Button onClick={handleSave}>Save Post</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={editingPost.title} 
                onChange={(e) => setEditingPost({...editingPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} 
                placeholder="Post title" 
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input 
                value={editingPost.slug} 
                onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})} 
                placeholder="URL slug (e.g., my-first-post)" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea 
              value={editingPost.excerpt} 
              onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})} 
              placeholder="Brief description for blog listing..." 
              className="h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Content (Markdown)</Label>
            <Textarea 
              value={editingPost.content} 
              onChange={(e) => setEditingPost({...editingPost, content: e.target.value})} 
              placeholder="# Write your blog post in Markdown..." 
              className="h-64 font-mono"
            />
          </div>
        </div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">/blog/{post.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.is_published ? 'bg-whatsapp/20 text-whatsapp' : 'bg-muted text-muted-foreground'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No posts found. Create your first blog post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
