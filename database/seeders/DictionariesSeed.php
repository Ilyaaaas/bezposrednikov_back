<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DictionariesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dic_build_type')->insert([
            ["name" => "кирпичный"],
            ["name" => "панельный"],
            ["name" => "монолитный"],
            ["name" => "иное"],
        ]);

        DB::table('dic_condit')->insert([
            ["name" => "Новая"],
            ["name" => "Черновая"],
            ["name" => "Евроремонт"],
            ["name" => "Хорошее"],
            ["name" => "Косметический ремонт"],
        ]);

        DB::table('dic_type_home')->insert([
            ["name" => "Квартиру"],
            ["name" => "Комнату"],
            ["name" => "Дом"],
            ["name" => "Участок"],
            ["name" => "Офис"],
            ["name" => "Помещение"],
            ["name" => "Дачу"],
        ]);

        DB::table('dic_type_room')->insert([
            ["name" => "1 комн.",           "p1" => 0, "p2" => 1],
            ["name" => "1-2 комн.",         "p1" => 1, "p2" => 2],
            ["name" => "2 комн.",           "p1" => 2, "p2" => 2],
            ["name" => "2-3 комн.",         "p1" => 2, "p2" => 3],
            ["name" => "3 комн.",           "p1" => 3, "p2" => 3],
            ["name" => "3-4 комн.",         "p1" => 3, "p2" => 4],
            ["name" => "4 комн.",           "p1" => 4, "p2" => 4],
            ["name" => "4-5 комн.",         "p1" => 4, "p2" => 5],
            ["name" => "5 комн.",           "p1" => 5, "p2" => 5],
            ["name" => "5 и более комн.",   "p1" => 5, "p2" => 50],
        ]);

        DB::table('dic_type_sale')->insert([
            [
                "name" => "Купить",
                "name_other" => "Продать",
                "name2" => "Продам",
            ],
            [
                "name" => "Снять",
                "name_other" => "Сдать",
                "name2" => "Сдам",
            ],
            [
                "name" => "Снять посуточно",
                "name_other" => "Сдать посуточно",
                "name2" => "Сдам посуточно",
            ],
            [
                "name" => "Снять по недельно",
                "name_other" => "Сдать по недельно",
                "name2" => "Сдам по недельно",
            ],
            [
                "name" => "Снять по месячно",
                "name_other" => "Сдать по месячно",
                "name2" => "Сдам по месячно",
            ],
        ]);

        DB::table('dic_country')->insert([
            "code" => "398",
            "name" => "Казахстан",
            "name_all" => "Весь Казахстан"
        ]);

        DB::table('dic_region')->insert([
            ["country_code" => "398", "name" => "Город республиканского значения", "num_main" => "1"],
            ["country_code" => "398", "name" => "Акмолинская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Актюбинская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Алматинская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Атырауская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Западно-Казахстанская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Жамбылская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Карагандинская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Костанайская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Кызылординская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Мангистауская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Туркестанская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Павлодарская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Северо-Казахстанская область", "num_main" => "2"],
            ["country_code" => "398", "name" => "Восточно-Казахстанская область", "num_main" => "2"],
        ]);

        DB::table('dic_cities')->insert([
            ["country_code" => "398", "name" => "Нур-Султан (Астана)", "id_region" => 1, 'state' => 1],
            ["country_code" => "398", "name" => "Алматы", "id_region" => 1, 'state' => 1],
            ["country_code" => "398", "name" => "Есик", "id_region" => 4],
            ["country_code" => "398", "name" => "Казалинск", "id_region" => 10],
            ["country_code" => "398", "name" => "Капчагай", "id_region" => 4],
            ["country_code" => "398", "name" => "Лисаковск", "id_region" => 9],
            ["country_code" => "398", "name" => "Степногорск", "id_region" => 2],
            ["country_code" => "398", "name" => "Степняк", "id_region" => 2],
            ["country_code" => "398", "name" => "Ушарал", "id_region" => 4],
            ["country_code" => "398", "name" => "Хромтау", "id_region" => 3],
            ["country_code" => "398", "name" => "Абай", "id_region" => 8],
            ["country_code" => "398", "name" => "Алга", "id_region" => 2],
            ["country_code" => "398", "name" => "Атырау", "id_region" => 5],
            ["country_code" => "398", "name" => "Атбасар", "id_region" => 2],
            ["country_code" => "398", "name" => "Балхаш", "id_region" => 8],
            ["country_code" => "398", "name" => "Жетысай", "id_region" => 12],
            ["country_code" => "398", "name" => "Зыряновск", "id_region" => 15],
            ["country_code" => "398", "name" => "Кандыагаш", "id_region" => 3],
            ["country_code" => "398", "name" => "Костанай", "id_region" => 9],
            ["country_code" => "398", "name" => "Павлодар", "id_region" => 13],
            ["country_code" => "398", "name" => "Петропавловск", "id_region" => 14],
            ["country_code" => "398", "name" => "Приозерск", "id_region" => 8],
            ["country_code" => "398", "name" => "Риддер", "id_region" => 15],
            ["country_code" => "398", "name" => "Сары-Агаш", "id_region" => 12],
            ["country_code" => "398", "name" => "Серебрянск", "id_region" => 15],
            ["country_code" => "398", "name" => "Талгар", "id_region" => 4],
            ["country_code" => "398", "name" => "Тараз", "id_region" => 7],
            ["country_code" => "398", "name" => "Текели", "id_region" => 4],
            ["country_code" => "398", "name" => "Темиртау", "id_region" => 8],
            ["country_code" => "398", "name" => "Форт-Шевченко", "id_region" => 11],
            ["country_code" => "398", "name" => "Аксай", "id_region" => 6],
            ["country_code" => "398", "name" => "Актюбинск", "id_region" => 2],
            ["country_code" => "398", "name" => "Аральск", "id_region" => 10],
            ["country_code" => "398", "name" => "Аркалык", "id_region" => 9],
            ["country_code" => "398", "name" => "Асу-Булак", "id_region" => 15],
            ["country_code" => "398", "name" => "Байконур", "id_region" => 10],
            ["country_code" => "398", "name" => "Жанаозен", "id_region" => 11],
            ["country_code" => "398", "name" => "Жем", "id_region" => 3],
            ["country_code" => "398", "name" => "Житикара", "id_region" => 9],
            ["country_code" => "398", "name" => "Каратау", "id_region" => 7],
            ["country_code" => "398", "name" => "Кентау", "id_region" => 12],
            ["country_code" => "398", "name" => "Кульсары", "id_region" => 5],
            ["country_code" => "398", "name" => "Курчатов", "id_region" => 15],
            ["country_code" => "398", "name" => "Кызылорда", "id_region" => 10],
            ["country_code" => "398", "name" => "Макинск", "id_region" => 2],
            ["country_code" => "398", "name" => "Мамлютка", "id_region" => 14],
            ["country_code" => "398", "name" => "Рудный", "id_region" => 9],
            ["country_code" => "398", "name" => "Сергеевка", "id_region" => 14],
            ["country_code" => "398", "name" => "Уральск", "id_region" => 6],
            ["country_code" => "398", "name" => "Усть-Каменогорск", "id_region" => 15],
            ["country_code" => "398", "name" => "Достык", "id_region" => 4],
            ["country_code" => "398", "name" => "Шымкент", "id_region" => 1],
            ["country_code" => "398", "name" => "Акколь", "id_region" => 2],
            ["country_code" => "398", "name" => "Актау", "id_region" => 11],
            ["country_code" => "398", "name" => "Аягоз", "id_region" => 15],
            ["country_code" => "398", "name" => "Булаево", "id_region" => 14],
            ["country_code" => "398", "name" => "Державинск", "id_region" => 2],
            ["country_code" => "398", "name" => "Есиль", "id_region" => 4],
            ["country_code" => "398", "name" => "Жанатас", "id_region" => 7],
            ["country_code" => "398", "name" => "Жаркент", "id_region" => 4],
            ["country_code" => "398", "name" => "Зайсан", "id_region" => 15],
            ["country_code" => "398", "name" => "Караганда", "id_region" => 8],
            ["country_code" => "398", "name" => "Каражал", "id_region" => 8],
            ["country_code" => "398", "name" => "Каскелен", "id_region" => 4],
            ["country_code" => "398", "name" => "Кокшетау", "id_region" => 5],
            ["country_code" => "398", "name" => "Сарканд", "id_region" => 4],
            ["country_code" => "398", "name" => "Сатпаев ", "id_region" => 8],
            ["country_code" => "398", "name" => "Семипалатинск", "id_region" => 15],
            ["country_code" => "398", "name" => "Тайынша", "id_region" => 14],
            ["country_code" => "398", "name" => "Талдыкорган", "id_region" => 4],
            ["country_code" => "398", "name" => "Темир", "id_region" => 3],
            ["country_code" => "398", "name" => "Туркестан", "id_region" => 12],
            ["country_code" => "398", "name" => "Уштобе", "id_region" => 4],
            ["country_code" => "398", "name" => "Аксу", "id_region" => 13],
            ["country_code" => "398", "name" => "Ерейментау", "id_region" => 2],
            ["country_code" => "398", "name" => "Жезказган", "id_region" => 8],
            ["country_code" => "398", "name" => "Каркаралинск", "id_region" => 4],
            ["country_code" => "398", "name" => "Ленгер", "id_region" => 12],
            ["country_code" => "398", "name" => "Кордай", "id_region" => 7],
            ["country_code" => "398", "name" => "Отеген Батыра", "id_region" => 4],
        ]);
    }
}
