<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table){
            $table->string('phone')->nullable();
            $table->string('avatar')->nullable();
            $table->integer('id_role')->default(1);
        });

        Schema::table('dic_cities', function (Blueprint $table){
            $table->integer('state')->default(0);
        });

        Schema::table('home', function (Blueprint $table){
            $table->integer('sort_num')->default(100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
