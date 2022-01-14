<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToDicRegionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dic_region', function(Blueprint $table)
		{
			$table->foreign('country_code', 'FK_dic_region_dic_country_code')->references('code')->on('dic_country')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dic_region', function(Blueprint $table)
		{
			$table->dropForeign('FK_dic_region_dic_country_code');
		});
	}

}
