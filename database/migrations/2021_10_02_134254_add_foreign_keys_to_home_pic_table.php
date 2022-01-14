<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToHomePicTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('home_pic', function(Blueprint $table)
		{
			$table->foreign('id_home', 'FK_home_pic_home_id')->references('id')->on('home')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('home_pic', function(Blueprint $table)
		{
			$table->dropForeign('FK_home_pic_home_id');
		});
	}

}
