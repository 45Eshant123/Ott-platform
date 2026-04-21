import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, TrendingUp, Users, Eye } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [content, setContent] = useState([]);
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [trailerDrafts, setTrailerDrafts] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        type: 'movie',
        genre: [],
        language: 'English',
        description: '',
        releaseYear: new Date().getFullYear(),
        rating: 0,
        trailerUrl: '',
        thumbnail: null
    });

    useEffect(() => {
        if (activeTab === 'content') fetchContent();
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'analytics') fetchAnalytics();
    }, [activeTab]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await apiServerClient.fetch('/api/content?limit=100');
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }

            const data = await response.json();
            const items = data.items || [];
            setContent(items);
            setTrailerDrafts(
                items.reduce((acc, item) => {
                    const itemId = item.id || item._id;
                    acc[itemId] = item.trailerUrl || '';
                    return acc;
                }, {})
            );
        } catch (error) {
            console.error('Failed to fetch content:', error);
            toast.error('Failed to fetch content list');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTrailer = async (itemId) => {
        const trailerUrl = String(trailerDrafts[itemId] || '').trim();

        try {
            const response = await apiServerClient.fetch(`/api/content/${itemId}/trailer`, {
                method: 'PATCH',
                body: JSON.stringify({ trailerUrl })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message || 'Failed to update trailer URL');
            }

            toast('Trailer URL updated');
            setContent((prev) => prev.map((item) => {
                const id = item.id || item._id;
                return id === itemId ? { ...item, trailerUrl } : item;
            }));
        } catch (error) {
            toast.error(error.message || 'Failed to update trailer URL');
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const records = await pb.collection('users').getList(1, 100, {
                sort: '-created',
                $autoCancel: false
            });
            setUsers(records.items);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const contentRecords = await pb.collection('content').getList(1, 10, {
                sort: '-views',
                $autoCancel: false
            });

            const analyticsData = contentRecords.items.map(item => ({
                name: item.title.substring(0, 20),
                views: item.views || 0
            }));

            setAnalytics(analyticsData);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitContent = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'genre') {
                    data.append(key, JSON.stringify(formData[key]));
                } else if (key === 'thumbnail' && formData[key]) {
                    data.append(key, formData[key]);
                } else if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            if (editingContent) {
                await pb.collection('content').update(editingContent.id, data, { $autoCancel: false });
                toast('Content updated successfully');
            } else {
                await pb.collection('content').create(data, { $autoCancel: false });
                toast('Content created successfully');
            }

            setFormData({
                title: '',
                type: 'movie',
                genre: [],
                language: 'English',
                description: '',
                releaseYear: new Date().getFullYear(),
                rating: 0,
                trailerUrl: '',
                thumbnail: null
            });
            setEditingContent(null);
            fetchContent();
        } catch (error) {
            toast.error('Failed to save content');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContent = async (id) => {
        if (!window.confirm('Delete this content?')) return;

        try {
            await pb.collection('content').delete(id, { $autoCancel: false });
            toast('Content deleted');
            fetchContent();
        } catch (error) {
            toast.error('Failed to delete content');
        }
    };

    const handleEditContent = (item) => {
        setEditingContent(item);
        setFormData({
            title: item.title,
            type: item.type,
            genre: item.genre || [],
            language: item.language,
            description: item.description || '',
            releaseYear: item.releaseYear || new Date().getFullYear(),
            rating: item.rating || 0,
            trailerUrl: item.trailerUrl || '',
            thumbnail: null
        });
    };

    const handleToggleUserRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        try {
            await pb.collection('users').update(userId, { role: newRole }, { $autoCancel: false });
            toast(`User role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Delete this user?')) return;

        try {
            await pb.collection('users').delete(userId, { $autoCancel: false });
            toast('User deleted');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - StreamVault</title>
                <meta name="description" content="Manage content, users, and analytics" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-8 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                        Admin Dashboard
                    </h1>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-8">
                            <TabsTrigger value="content">Content Management</TabsTrigger>
                            <TabsTrigger value="users">User Management</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-card rounded-2xl p-6">
                                    <h2 className="font-display font-semibold text-2xl mb-6 text-card-foreground">
                                        {editingContent ? 'Edit Content' : 'Add New Content'}
                                    </h2>

                                    <form onSubmit={handleSubmitContent} className="space-y-4">
                                        <div>
                                            <Label className="text-card-foreground">Title</Label>
                                            <Input
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Type</Label>
                                            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                                <SelectTrigger className="bg-background text-foreground">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="movie">Movie</SelectItem>
                                                    <SelectItem value="series">Series</SelectItem>
                                                    <SelectItem value="anime">Anime</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Language</Label>
                                            <Input
                                                value={formData.language}
                                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Release Year</Label>
                                            <Input
                                                type="number"
                                                value={formData.releaseYear}
                                                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Rating (0-10)</Label>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                value={formData.rating}
                                                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Description</Label>
                                            <Textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                rows={4}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Trailer URL</Label>
                                            <Input
                                                value={formData.trailerUrl}
                                                onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-card-foreground">Thumbnail</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
                                                className="bg-background text-foreground"
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <Button type="submit" disabled={loading}>
                                                {loading ? 'Saving...' : editingContent ? 'Update' : 'Create'}
                                            </Button>
                                            {editingContent && (
                                                <Button type="button" variant="secondary" onClick={() => {
                                                    setEditingContent(null);
                                                    setFormData({
                                                        title: '',
                                                        type: 'movie',
                                                        genre: [],
                                                        language: 'English',
                                                        description: '',
                                                        releaseYear: new Date().getFullYear(),
                                                        rating: 0,
                                                        trailerUrl: '',
                                                        thumbnail: null
                                                    });
                                                }}>
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </div>

                                <div className="bg-card rounded-2xl p-6">
                                    <h2 className="font-display font-semibold text-2xl mb-6 text-card-foreground">Content List</h2>
                                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                        {content.map((item) => (
                                            <div key={item.id || item._id} className="p-4 bg-background rounded-lg space-y-3">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.type} • {item.language} • {item.releaseYear}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="secondary" onClick={() => handleEditContent(item)}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="destructive" onClick={() => handleDeleteContent(item.id || item._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
                                                    <Input
                                                        value={trailerDrafts[item.id || item._id] || ''}
                                                        onChange={(e) => setTrailerDrafts((prev) => ({
                                                            ...prev,
                                                            [item.id || item._id]: e.target.value
                                                        }))}
                                                        placeholder="https://www.youtube.com/watch?v=..."
                                                        className="bg-card text-foreground"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleSaveTrailer(item.id || item._id)}
                                                    >
                                                        Save Trailer
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="users">
                            <div className="bg-card rounded-2xl p-6">
                                <h2 className="font-display font-semibold text-2xl mb-6 text-card-foreground">User Management</h2>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-card-foreground">Name</TableHead>
                                            <TableHead className="text-card-foreground">Email</TableHead>
                                            <TableHead className="text-card-foreground">Role</TableHead>
                                            <TableHead className="text-card-foreground">Joined</TableHead>
                                            <TableHead className="text-card-foreground">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="text-card-foreground">{user.name}</TableCell>
                                                <TableCell className="text-card-foreground">{user.email}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-card-foreground">
                                                    {new Date(user.created).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => handleToggleUserRole(user.id, user.role)}
                                                        >
                                                            Toggle Role
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="analytics">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-card rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Eye className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Views</p>
                                            <p className="text-2xl font-bold text-card-foreground">
                                                {content.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <TrendingUp className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Content</p>
                                            <p className="text-2xl font-bold text-card-foreground">{content.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card rounded-2xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Users className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Users</p>
                                            <p className="text-2xl font-bold text-card-foreground">{users.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-2xl p-6">
                                <h2 className="font-display font-semibold text-2xl mb-6 text-card-foreground">Popular Content</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={analytics}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                        <YAxis stroke="hsl(var(--muted-foreground))" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar dataKey="views" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default AdminDashboard;