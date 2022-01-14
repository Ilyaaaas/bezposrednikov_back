<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property integer $id_user
 * @property integer $id_home
 * @property Home $home
 * @property User $user
 */
class Favorite extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    public $timestamps = false;

    /**
     * @var array
     */
    protected $fillable = ['id_user', 'id_home'];

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
}
