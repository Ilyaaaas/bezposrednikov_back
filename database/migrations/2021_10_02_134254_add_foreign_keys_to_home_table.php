<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToHomeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('home', function(Blueprint $table)
		{
			$table->foreign('id_city', 'FK_home_dic_cities_id')->references('id')->on('dic_cities')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id_type_home', 'FK_home_dic_type_home_id')->references('id')->on('dic_type_home')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id_type_sale', 'FK_home_dic_type_sale_id')->references('id')->on('dic_type_sale')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id_user', 'FK_home_users_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('home', function(Blueprint $table)
		{
			$table->dropForeign('FK_home_dic_cities_id');
			$table->dropForeign('FK_home_dic_type_home_id');
			$table->dropForeign('FK_home_dic_type_sale_id');
			$table->dropForeign('FK_home_users_id');
		});
	}

}
