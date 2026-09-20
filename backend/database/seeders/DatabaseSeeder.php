<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        // Admin user default
        if (!User::where('email', 'admin@bonekaku.co.id')->exists()) {
            User::create([
                'name' => 'Admin BonekaKu',
                'email' => 'admin@bonekaku.co.id',
                'password' => Hash::make('bonekaku2024'),
            ]);
        }
    }
}
