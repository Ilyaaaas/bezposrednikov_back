<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_home')->index('FK_home_comment_home_id');
            $table->unsignedBigInteger('id_user')->index('FK_home_comment_user_id');
            $table->text('comment_text');
            $table->bigInteger('id_child')->nullable()->default(0);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('id_home', 'FK_home_comment_home_id')->references('id')->on('home')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('id_user', 'FK_home_comment_user_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('home_comments');
    }
}
