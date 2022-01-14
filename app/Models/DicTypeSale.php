<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $name_other
 * @property string $name2
 * @property Home[] $homes
 */
class DicTypeSale extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'dic_type_sale';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['name', 'name_other', 'name2'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function homes()
    {
        return $this->hasMany('App\Models\Home', 'id_type_sale');
    }
}
