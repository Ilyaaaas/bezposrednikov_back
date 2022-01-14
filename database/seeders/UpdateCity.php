<?php

namespace Database\Seeders;

use App\Models\DicCitie;
use Illuminate\Database\Seeder;

class UpdateCity extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "id" => 1,
                "latitude" => "51.128207",
                "longitude" => "71.430411",
            ],
            [
                "id" => 2,
                "latitude" => "43.2566700",
                "longitude" => "76.9286100",
            ]
        ];

        foreach($data as $dt){
            $city = DicCitie::find($dt['id']);
            $city->latitude = $dt['latitude'];
            $city->longitude = $dt['longitude'];
            $city->save();
        }
    }
}
