<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', fn() => Inertia::render('home'))->name('home');

Route::get('/detail', fn() => Inertia::render('product-details'))->name('detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('dashboard/index'))->name('dashboard');

    // Product routes
    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('products.index');

    // Product create page - show form
    Route::get('/dashboard/products/create', fn() => Inertia::render('dashboard/products/ProductCreate'))->name('products.create');

    // Product store route - handle form submission
    Route::post('/dashboard/products', [ProductController::class, 'store'])->name('products.store');

    // Categories page
    Route::get('/dashboard/categories', fn() => Inertia::render('dashboard/categories/index'))->name('categories');
});

// Include other route files
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
