<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property int $state
 */
class DicRc extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dic_rc';

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
    protected $fillable = ['name', 'state'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function homes()
    {
        return $this->hasMany('App\Models\Home', 'id_rc');
    }

}
