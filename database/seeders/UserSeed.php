<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            "name" => "Administrator",
            "email" => "admin@mail.ru",
            "password" => Hash::make("12345678")
        ];

        User::create($user);
    }
}
