<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property Home[] $homes
 */
class DicTypeHome extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dic_type_home';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['name'];

    protected $visible = ['id', 'name'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function homes()
    {
        return $this->hasMany('App\Models\Home', 'id_type_home');
    }
}
