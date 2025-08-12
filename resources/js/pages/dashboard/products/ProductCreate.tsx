import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Products', href: '/dashboard/products' },
  { title: 'Add Product', href: '/dashboard/products/create' },
];

export default function ProductCreate() {
  const [form, setForm] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    sku: '',
    status: 'active',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post('/dashboard/products', form, {
      onSuccess: () => {
        router.visit('/dashboard/products');
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Product" />
      <div className="p-8 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 max-w-4xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">Add Product</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            />
          </div>

          {/* Category */}
          <div className="col-span-1">
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Food & Beverage</option>
              <option>Sports</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            />
          </div>

          {/* SKU */}
          <div>
            <label htmlFor="sku" className="block text-sm font-medium mb-1">SKU</label>
            <input
              id="sku"
              name="sku"
              type="text"
              required
              value={form.sku}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            >
              <option value="active">Active</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Image URL (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 dark:bg-neutral-800"
            />
          </div>

          {/* Submit Button (full width on desktop) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
