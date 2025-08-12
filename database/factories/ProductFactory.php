<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition()
    {
        $categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Sports', 'Books', 'Home & Garden'];
        $stock = $this->faker->numberBetween(0, 100);
        
        return [
            'name' => $this->faker->words(3, true),
            'sku' => strtoupper($this->faker->lexify('???-###')),
            'description' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement($categories),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'stock' => $stock,
            'sales' => $this->faker->numberBetween(0, 1000),
        ];
    }
}

