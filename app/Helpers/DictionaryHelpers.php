<?php


namespace App\Helpers;


use App\Models\DicBuildType;
use App\Models\DicCitie;
use App\Models\DicCondit;
use App\Models\DicRc;
use App\Models\DicRegion;
use App\Models\DicTypeHome;
use App\Models\DicTypeSale;

class DictionaryHelpers
{
    public function AllCityFromCountry($country_code = "398")
    {
        $city = DicCitie::query()
            ->where(['state' => 1, "country_code" => $country_code])
            ->pluck('id_region')
            ->toArray();
        return DicRegion::with('child')
            //->where("country_code", $country_code)
            ->whereIn('id', $city)
            //->where("num_main", "<>", 1)
            ->orderBy('num_main')
            ->orderBy('name')
            ->get(["id", "name"])
            ->toArray();
    }

    public function all()
    {
        return [
            "dic_build_type" => DicBuildType::all(["id", "name"]),
            "dic_condit" => DicCondit::all(["id", "name"]),
            "dic_type_sale" => DicTypeSale::all(["id", "name2 as name"]),
            "dic_type_home" => DicTypeHome::all(["id", "name"]),
            "dic_city" => $this->AllCityFromCountry(),
            "dic_rc" => DicRc::query()->where(['state' => 1])->get(['id', 'name']),
        ];
    }
}
