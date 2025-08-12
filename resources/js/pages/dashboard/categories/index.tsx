import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Eye,
    Layers,
    Tag,
    Package,
    Grid3X3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/dashboard/categories' },
];

// Mock data - replace with actual data from props or API
const mockCategories = [
    {
        id: 1,
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        parent_id: null,
        products_count: 45,
        status: 'active',
        image: '/api/placeholder/80/80',
        created_at: '2024-01-15',
        subcategories: ['Smartphones', 'Laptops', 'Audio']
    },
    {
        id: 2,
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Mobile phones and accessories',
        parent_id: 1,
        products_count: 23,
        status: 'active',
        image: '/api/placeholder/80/80',
        created_at: '2024-01-20',
        subcategories: []
    },
    {
        id: 3,
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel items',
        parent_id: null,
        products_count: 78,
        status: 'active',
        image: '/api/placeholder/80/80',
        created_at: '2024-01-10',
        subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Accessories']
    },
    {
        id: 4,
        name: 'Food & Beverage',
        slug: 'food-beverage',
        description: 'Food items and beverages',
        parent_id: null,
        products_count: 34,
        status: 'active',
        image: '/api/placeholder/80/80',
        created_at: '2024-01-08',
        subcategories: ['Organic', 'Beverages']
    },
    {
        id: 5,
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and fitness gear',
        parent_id: null,
        products_count: 19,
        status: 'inactive',
        image: '/api/placeholder/80/80',
        created_at: '2024-01-25',
        subcategories: ['Fitness', 'Outdoor']
    }
];

const stats = [
    { label: 'Total Categories', value: '56', change: '+3', trend: 'up', icon: Layers },
    { label: 'Active Categories', value: '52', change: '+5', trend: 'up', icon: Tag },
    { label: 'Products Assigned', value: '1,234', change: '+12%', trend: 'up', icon: Package },
    { label: 'Subcategories', value: '23', change: '+2', trend: 'up', icon: Grid3X3 },
];

export default function CategoriesIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showActions, setShowActions] = useState<number | null>(null);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            router.delete(`/dashboard/categories/${id}`);
        }
    };

    const filteredCategories = mockCategories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
        const matchesType = selectedType === 'all' || 
                            (selectedType === 'parent' && !category.parent_id) ||
                            (selectedType === 'subcategory' && category.parent_id);
        
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Categories</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">Organize and manage your product categories</p>
                    </div>
                    <Link
                        href="/dashboard/categories/create"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Category</span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                                        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{stat.value}</p>
                                    </div>
                                    <Icon className="h-8 w-8 text-neutral-400 dark:text-neutral-600" />
                                </div>
                                <div className="mt-4 flex items-center">
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {stat.change}
                                    </span>
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">from last month</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Types</option>
                            <option value="parent">Parent Categories</option>
                            <option value="subcategory">Subcategories</option>
                        </select>
                    </div>
                </div>

                {/* Categories Grid View */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCategories.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            {/* Category Image */}
                            <div className="relative">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-32 object-cover bg-neutral-200 dark:bg-neutral-700"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(category.status)}`}>
                                        {category.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Category Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {category.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowActions(showActions === category.id ? null : category.id)
                                        }
                                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        aria-label="More actions"
                                    >
                                        <MoreHorizontal className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                                    </button>
                                </div>

                                {/* Subcategories */}
                                {category.subcategories.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                            Subcategories:
                                        </h4>
                                        <ul className="flex flex-wrap gap-2">
                                            {category.subcategories.map((sub, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full"
                                                >
                                                    {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Products Count & Created At */}
                                <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
                                    <span>{category.products_count} Products</span>
                                    <span>Created: {new Date(category.created_at).toLocaleDateString()}</span>
                                </div>

                                {/* Action Buttons Dropdown */}
                                {showActions === category.id && (
                                    <div className="mt-4 flex space-x-3 justify-end border-t border-neutral-200 dark:border-neutral-700 pt-3">
                                        <Link
                                            href={`/dashboard/categories/${category.id}`}
                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>View</span>
                                        </Link>
                                        <Link
                                            href={`/dashboard/categories/${category.id}/edit`}
                                            className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-800"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <p className="text-center text-neutral-500 dark:text-neutral-400 mt-12">
                        No categories found matching your criteria.
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
