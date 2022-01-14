<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property integer $id_home
 * @property string $pic
 * @property int $general
 * @property Home $home
 */
class HomePic extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'home_pic';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['id_home', 'pic', 'general'];
    protected $visible = ['id', 'id_home', 'pic', 'general'];

    /**
     * @return BelongsTo
     */
    public function home()
    {
        return $this->belongsTo('App\Models\Home', 'id_home');
    }
}
