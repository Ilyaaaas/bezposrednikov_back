<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToDicDistrictTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dic_district', function(Blueprint $table)
		{
			$table->foreign('id_city', 'FK_dic_district_dic_cities_id')->references('id')->on('dic_cities')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dic_district', function(Blueprint $table)
		{
			$table->dropForeign('FK_dic_district_dic_cities_id');
		});
	}

}
