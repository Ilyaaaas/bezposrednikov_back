<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToFavoritesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('favorites', function(Blueprint $table)
		{
			$table->foreign('id_home', 'FK_favorites_home_id')->references('id')->on('home')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id_user', 'FK_favorites_users_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('favorites', function(Blueprint $table)
		{
			$table->dropForeign('FK_favorites_home_id');
			$table->dropForeign('FK_favorites_users_id');
		});
	}

}
