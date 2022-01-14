<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo as BelongsToAlias;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property integer $id
 * @property string $country_code
 * @property integer $id_region
 * @property string $name
 * @property string $latitude
 * @property string $longitude
 * @property DicCountry $dicCountry
 * @property DicRegion $dicRegion
 * @property Home[] $homes
 */
class DicCitie extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['country_code', 'id_region', 'name', 'latitude', 'longitude'];

    protected $visible = ['id', 'name', 'latitude', 'longitude'];

    /**
     * @return BelongsToAlias
     */
    public function dicCountry(): BelongsToAlias
    {
        return $this->belongsTo('App\Models\DicCountry', 'country_code', 'code');
    }

    /**
     * @return BelongsToAlias
     */
    public function dicRegion(): BelongsToAlias
    {
        return $this->belongsTo('App\Models\DicRegion', 'id_region');
    }

    /**
     * @return HasMany
     */
    public function homes(): HasMany
    {
        return $this->hasMany('App\Models\Home', 'id_city');
    }
}
