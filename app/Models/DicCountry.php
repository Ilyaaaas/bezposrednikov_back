<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $name_all
 * @property DicCity[] $dicCities
 * @property DicRegion[] $dicRegions
 */
class DicCountry extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'dic_country';

    /**
     * @var array
     */
    protected $fillable = ['id', 'code', 'name', 'name_all'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function dicCities()
    {
        return $this->hasMany('App\Models\DicCity', 'country_code', 'code');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function dicRegions()
    {
        return $this->hasMany('App\Models\DicRegion', 'country_code', 'code');
    }
}
