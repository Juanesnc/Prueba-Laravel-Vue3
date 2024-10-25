<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            [
                'id' => (string) Str::uuid(),
                'name' => 'twitter'
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'google'
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'facebook'
            ]
        ]);
    }
}
