<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property integer $id_comment
 * @property integer $id_user
 * @property int $likes
 * @property int $dislike
 * @property string $created_at
 * @property string $updated_at
 * @property HomeComment $homeComment
 * @property User $user
 */
class HomeCommentsLike extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'home_comments_like';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['id_comment', 'id_user', 'likes', 'dislike', 'created_at', 'updated_at'];

    /**
     * @return BelongsTo
     */
    public function homeComment(): BelongsTo
    {
        return $this->belongsTo('App\Models\HomeComment', 'id_comment');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User', 'id_user');
    }
}
