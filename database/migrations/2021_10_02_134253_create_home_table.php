<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('home', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('id_user')->unsigned()->index('FK_home_users_id');
			$table->bigInteger('id_type_sale')->unsigned()->index('FK_home_dic_type_sale_id');
			$table->bigInteger('id_type_home')->unsigned()->index('FK_home_dic_type_home_id');
			$table->bigInteger('id_city')->unsigned()->index('FK_home_dic_cities_id');
			$table->text('address')->nullable()->comment('Адрес');
			$table->integer('cnt_rooms')->nullable()->default(1)->comment('Кол-во комнат');
			$table->integer('cnt_loggia')->nullable()->default(0)->comment('Кол-во лоджий');
			$table->integer('cnt_balkony')->nullable()->comment('Кол-во балконов');
			$table->integer('cnt_toilet')->nullable()->comment('Ко-во санузлов');
			$table->boolean('toilet_from_bathroom')->nullable()->default(0)->comment('Туалет совмещенный');
			$table->float('total_area')->default(0)->comment('Общая площадь м2');
			$table->float('living_area')->nullable()->comment('Жилая площадь м2');
			$table->float('kitchen_area')->nullable()->comment('Кухня м2');
			$table->integer('year_construction')->nullable()->comment('год постройки');
			$table->integer('floor')->nullable()->comment('Этаж');
			$table->integer('floor_all')->nullable()->comment('Кол-во этажей в доме');
			$table->integer('id_condit')->default(1)->comment('Состояние квартиры, ремонт');
			$table->text('other_comment')->nullable()->comment('Другое описание');
			$table->string('phone');
			$table->string('phone2')->nullable();
			$table->string('phone3')->nullable();
			$table->decimal('price', 19)->nullable()->comment('Цена');
			//$table->timestamp('date_set')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('state')->default(0);
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
		Schema::drop('home');
	}

}
