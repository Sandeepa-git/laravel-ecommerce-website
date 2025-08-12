import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Package, Layers, TrendingUp, BarChart3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Quick Navigation Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Link 
                        href="/dashboard/products"
                        className="relative group bg-white dark:bg-neutral-900 p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Products</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Manage inventory</p>
                            </div>
                        </div>
                    </Link>

                    <Link 
                        href="/dashboard/categories"
                        className="relative group bg-white dark:bg-neutral-900 p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                                <Layers className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Categories</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Organize products</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-6">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900">
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Products</h4>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">1,234</p>
                            </div>
                            <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                    </div>
                    
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900">
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Categories</h4>
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">56</p>
                            </div>
                            <p className="text-xs text-blue-600 dark:text-blue-400">+3 new categories</p>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                    </div>
                    
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900">
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Revenue</h4>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">$12,345</p>
                            </div>
                            <p className="text-xs text-green-600 dark:text-green-400">+8% from last month</p>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-white dark:bg-neutral-900">
                    <div className="absolute inset-0 p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-neutral-600 dark:text-neutral-400">New product "Wireless Headphones" added</span>
                                <span className="text-neutral-400 dark:text-neutral-500">2 hours ago</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-neutral-600 dark:text-neutral-400">Category "Electronics" updated</span>
                                <span className="text-neutral-400 dark:text-neutral-500">5 hours ago</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-neutral-600 dark:text-neutral-400">15 new orders received</span>
                                <span className="text-neutral-400 dark:text-neutral-500">1 day ago</span>
                            </div>
                        </div>
                    </div>
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />
                </div>
            </div>
        </AppLayout>
    );
}
