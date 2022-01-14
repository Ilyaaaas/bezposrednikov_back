<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property integer $id
 * @property integer $id_home
 * @property integer $id_user
 * @property string $comment_text
 * @property integer $id_child
 * @property string $deleted_at
 * @property string $created_at
 * @property string $updated_at
 * @property Home $home
 * @property User $user
 * @property HomeCommentsLike[] $homeCommentsLikes
 */
class HomeComment extends Model
{
    use SoftDeletes;

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    protected $hidden = [
        'deleted_at',
        'updated_at'
    ];

    /**
     * @var array
     */
    protected $fillable = [
        'id_home',
        'id_user',
        'comment_text',
        'id_child',
        'created_at'
    ];

    protected $casts = [
        'created_at' => 'datetime:d.m.Y h:i:s'
    ];

    /**
     * @return BelongsTo
     */
    public function home(): BelongsTo
    {
        return $this->belongsTo('App\Models\Home', 'id_home');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User', 'id_user');
    }

    /**
     * @return HasMany
     */
    public function homeCommentsLikes(): HasMany
    {
        return $this->hasMany('App\Models\HomeCommentsLike', 'id_comment');
    }
}
