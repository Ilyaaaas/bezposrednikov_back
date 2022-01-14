<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property integer $id
 * @property string $country_code
 * @property string $name
 * @property int $num_main
 * @property DicCountry $dicCountry
 * @property DicCitie[] $dicCitie
 * @property child[] $child
 */
class DicRegion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dic_region';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['country_code', 'name', 'num_main'];

    /**
     * @return BelongsTo
     */
    public function dicCountry()
    {
        return $this->belongsTo('App\Models\DicCountry', 'country_code', 'code');
    }

    /**
     * @return HasMany
     */
    public function dicCities()
    {
        return $this->hasMany('App\Models\DicCitie', 'id_region');
    }

    /**
     * @return HasMany
     */
    public function child()
    {
        return $this->hasMany('App\Models\DicCitie', 'id_region')
            ->where('state', 1)
            ->orderBy('id');
    }
}
