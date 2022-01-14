<?php

namespace App\Http\Controllers;

use App\Helpers\DictionaryHelpers;
use App\Models\DicBuildType;
use App\Models\DicCondit;
use App\Models\DicDistrict;
use App\Models\DicRc;
use App\Models\DicTypeHome;
use App\Models\DicTypeRoom;
use App\Models\DicTypeSale;
use Illuminate\Http\Request;

class DictionaryController extends Controller
{
    public function all()
    {
        return $this->sendSuccess([
            "dic_type_home" => $this->type_home(),
            "dic_type_room" => $this->type_room(),
            "dic_type_sale" => $this->type_sale(),
            "dic_build_type" => $this->build_type(),
            "dic_condit" => $this->condit(),
            "dic_city" => (new DictionaryHelpers())->AllCityFromCountry()
        ]);
    }

    public function type_home()
    {
        return DicTypeHome::all();
    }

    public function type_room()
    {
        return DicTypeRoom::all();
    }

    public function type_sale()
    {
        return DicTypeSale::all();
    }

    public function build_type()
    {
        return DicBuildType::all();
    }

    public function condit()
    {
        return DicCondit::all();
    }

    public function rc($id_city)
    {
        $q = DicRc::query()
            ->where(['state' => 1, "id_city" => $id_city])
            ->orWhere('id', 1)
            ->get(['id', 'name']);
        return $this->sendSuccess($q);
    }

    public function district($id_city)
    {
        $q = DicDistrict::query()->where(['state' => 1, "id_city" => $id_city])->get(['id', 'name']);
        return $this->sendSuccess($q);
    }


}
