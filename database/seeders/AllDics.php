<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AllDics extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dir = __DIR__."/sqls";
        $files = scandir($dir);
        foreach($files as $file){
            $s = explode('.', $file);
            if($s[count($s)-1] == 'sql'){
                $sql = file_get_contents("$dir/$file");
                DB::unprepared($sql);
            }
        }
    }
}
