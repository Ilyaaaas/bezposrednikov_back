<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToDicCitiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dic_cities', function(Blueprint $table)
		{
			$table->foreign('country_code', 'FK_dic_cities_dic_country_code')->references('code')->on('dic_country')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id_region', 'FK_dic_cities_dic_region_id')->references('id')->on('dic_region')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dic_cities', function(Blueprint $table)
		{
			$table->dropForeign('FK_dic_cities_dic_country_code');
			$table->dropForeign('FK_dic_cities_dic_region_id');
		});
	}

}
