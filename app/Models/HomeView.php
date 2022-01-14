<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $id_home
 * @property integer $id_user
 * @property string $date_view
 * @property string $header_user
 * @property Home $home
 */
class HomeView extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'home_view';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    public $timestamps = false;

    /**
     * @var array
     */
    protected $fillable = ['id_home', 'id_user', 'date_view', 'header_user'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function home()
    {
        return $this->belongsTo('App\Models\Home', 'id_home');
    }
}
