<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeViewTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('home_view', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('id_home')->unsigned()->index('FK_home_view_home_id');
			$table->bigInteger('id_user')->unsigned()->nullable();
			$table->timestamp('date_view')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->text('header_user', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('home_view');
	}

}
