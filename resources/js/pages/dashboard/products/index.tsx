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
    Package,
    TrendingUp,
    TrendingDown,
    AlertCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/dashboard/products' },
];

// Mock data - replace with actual data from props
const mockProducts = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: 79.99,
        stock: 45,
        status: 'active',
        image: '/api/placeholder/60/60',
        sku: 'WBH-001',
        sales: 234
    },
    {
        id: 2,
        name: 'Organic Cotton T-Shirt',
        category: 'Clothing',
        price: 24.99,
        stock: 0,
        status: 'out_of_stock',
        image: '/api/placeholder/60/60',
        sku: 'OCT-002',
        sales: 156
    },
    {
        id: 3,
        name: 'Premium Coffee Beans',
        category: 'Food & Beverage',
        price: 18.50,
        stock: 23,
        status: 'low_stock',
        image: '/api/placeholder/60/60',
        sku: 'PCB-003',
        sales: 89
    },
    {
        id: 4,
        name: 'Yoga Mat Pro',
        category: 'Sports',
        price: 45.00,
        stock: 67,
        status: 'active',
        image: '/api/placeholder/60/60',
        sku: 'YMP-004',
        sales: 78
    },
    {
        id: 5,
        name: 'Smart Water Bottle',
        category: 'Electronics',
        price: 32.99,
        stock: 12,
        status: 'low_stock',
        image: '/api/placeholder/60/60',
        sku: 'SWB-005',
        sales: 145
    }
];

const stats = [
    { label: 'Total Products', value: '1,234', change: '+12%', trend: 'up', icon: Package },
    { label: 'Out of Stock', value: '23', change: '-5%', trend: 'down', icon: AlertCircle },
    { label: 'Low Stock', value: '45', change: '+8%', trend: 'up', icon: TrendingDown },
    { label: 'Active Products', value: '1,166', change: '+15%', trend: 'up', icon: TrendingUp },
];

export default function Products() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showActions, setShowActions] = useState<number | null>(null);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            low_stock: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        };
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    };

    const getStatusText = (status: string) => {
        const statusText = {
            active: 'Active',
            out_of_stock: 'Out of Stock',
            low_stock: 'Low Stock',
        };
        return statusText[status as keyof typeof statusText] || 'Active';
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/dashboard/products/${id}`);
        }
    };

    const filteredProducts = mockProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Products</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">Manage your product inventory</p>
                    </div>
                    <Link
                        href="/dashboard/products/create"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Product</span>
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
                                    <span className={`text-sm font-medium ${
                                        stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                    }`}>
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
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Sports">Sports</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Product</th>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Category</th>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Price</th>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Stock</th>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Status</th>
                                    <th className="text-left py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Sales</th>
                                    <th className="text-right py-4 px-6 font-medium text-neutral-900 dark:text-neutral-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg object-cover bg-neutral-200 dark:bg-neutral-700"
                                                />
                                                <div>
                                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{product.name}</p>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-neutral-900 dark:text-neutral-100">{product.category}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-neutral-900 dark:text-neutral-100">${product.price}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`font-medium ${
                                                product.stock === 0 ? 'text-red-600 dark:text-red-400' :
                                                product.stock <= 20 ? 'text-yellow-600 dark:text-yellow-400' :
                                                'text-neutral-900 dark:text-neutral-100'
                                            }`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                                                {getStatusText(product.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-neutral-900 dark:text-neutral-100">{product.sales}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowActions(showActions === product.id ? null : product.id)}
                                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                                >
                                                    <MoreHorizontal className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                                </button>
                                                
                                                {showActions === product.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-10">
                                                        <div className="py-1">
                                                            <Link
                                                                href={`/dashboard/products/${product.id}`}
                                                                className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                            >
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={`/dashboard/products/${product.id}/edit`}
                                                                className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                            >
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">No products found</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">Try adjusting your search or filter criteria.</p>
                            <Link
                                href="/dashboard/products/create"
                                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add First Product</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                    <div className="flex items-center justify-between bg-white dark:bg-neutral-900 px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                            <span className="font-medium">{filteredProducts.length}</span> results
                        </p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}