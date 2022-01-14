<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToDicRcTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dic_rc', function(Blueprint $table)
		{
			$table->foreign('id_city', 'FK_dic_rc_dic_cities_id')->references('id')->on('dic_cities')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dic_rc', function(Blueprint $table)
		{
			$table->dropForeign('FK_dic_rc_dic_cities_id');
		});
	}

}
