<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeCommentLike extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_comments_like', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_comment')->index('FK_home_comment_like_comment_id');
            $table->unsignedBigInteger('id_user')->index('FK_home_comment_like_user_id');
            $table->integer('likes')->default(0);
            $table->integer('dislike')->default(0);
            $table->foreign('id_comment', 'FK_home_comment_like_comment_id')->references('id')->on('home_comments')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('id_user', 'FK_home_comment_like_user_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
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
        Schema::dropIfExists('home_comments_like');
    }
}
