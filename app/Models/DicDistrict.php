<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property integer $id_city
 * @property string $name
 * @property int $state
 * @property DicCity $dicCity
 */
class DicDistrict extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dic_district';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['id_city', 'name', 'state'];

    /**
     * @return BelongsTo
     */
    public function dicCity()
    {
        return $this->belongsTo('App\Models\DicCitie', 'id_city');
    }
}
