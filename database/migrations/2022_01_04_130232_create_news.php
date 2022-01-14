<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Заголовок');
            $table->text('body')->comment('Тело новости');
            $table->date('date_start')->comment('Дата размещения');
            $table->date('date_end')->comment('Дата окончания показа');
            $table->integer('state')->default(1)->comment('Статус 1 - показывать');
            $table->integer('num_pp')->nullable()->comment('Порядок отображения');
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
        Schema::dropIfExists('news');
    }
}
