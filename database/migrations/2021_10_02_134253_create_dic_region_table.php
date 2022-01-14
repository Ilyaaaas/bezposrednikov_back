<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDicRegionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dic_region', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('country_code', 10)->index('FK_dic_region_dic_country_code');
			$table->string('name');
			$table->integer('num_main')->default(2);
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
		Schema::drop('dic_region');
	}

}
