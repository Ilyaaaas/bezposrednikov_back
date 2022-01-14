<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDicCitiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dic_cities', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('country_code', 10)->default('398')->index('FK_dic_cities_dic_country_code');
			$table->string('name');
			$table->bigInteger('id_region')->unsigned()->index('FK_dic_cities_dic_region_id');
            $table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dic_cities');
	}

}
