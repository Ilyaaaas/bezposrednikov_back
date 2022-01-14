<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property integer $id
 * @property integer $id_user
 * @property integer $id_type_sale
 * @property integer $id_type_home
 * @property integer $id_city
 * @property integer $id_rc
 * @property string $address
 * @property int $cnt_rooms
 * @property int $cnt_loggia
 * @property int $cnt_balkony
 * @property int $cnt_toilet
 * @property boolean $toilet_from_bathroom
 * @property float $total_area
 * @property float $living_area
 * @property float $kitchen_area
 * @property int $year_construction
 * @property int $floor
 * @property int $floor_all
 * @property int $id_condit
 * @property string $other_comment
 * @property string $phone
 * @property string $phone2
 * @property string $phone3
 * @property float $price
 * @property int $state
 * @property string $created_at
 * @property string $updated_at
 * @property int $sort_num
 * @property DicCity $dicCity
 * @property DicRc $dicRc
 * @property DicTypeHome $dicTypeHome
 * @property DicTypeSale $dicTypeSale
 * @property DicCondit $dicCondit;
 * @property User $user
 * @property Favorite[] $favorites
 * @property HomeComment[] $homeComments
 * @property HomePic[] $homePics
 * @property HomeView[] $homeViews
 */

class Home extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'home';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['id_user', 'id_type_sale', 'id_type_home', 'id_city', 'id_rc', 'address', 'cnt_rooms', 'cnt_loggia', 'cnt_balkony', 'cnt_toilet', 'toilet_from_bathroom', 'total_area', 'living_area', 'kitchen_area', 'year_construction', 'floor', 'floor_all', 'id_condit', 'other_comment', 'phone', 'phone2', 'phone3', 'price', 'state', 'created_at', 'updated_at', 'sort_num'];

    /**
     * @return BelongsTo
     */
    public function dicCity(): BelongsTo
    {
        return $this->belongsTo('App\Models\DicCitie', 'id_city');
    }

    /**
     * @return BelongsTo
     */
    public function dicRc(): BelongsTo
    {
        return $this->belongsTo('App\Models\DicRc', 'id_rc');
    }

    /**
     * @return BelongsTo
     */
    public function dicTypeHome(): BelongsTo
    {
        return $this->belongsTo('App\Models\DicTypeHome', 'id_type_home');
    }

    /**
     * @return BelongsTo
     */
    public function dicTypeSale(): BelongsTo
    {
        return $this->belongsTo('App\Models\DicTypeSale', 'id_type_sale');
    }

    /**
     * @return BelongsTo
     */
    public function dicCondit(): BelongsTo
    {
        return $this->belongsTo('App\Models\DicCondit', 'id_condit');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User', 'id_user');
    }

    /**
     * @return HasMany
     */
    public function favorites(): HasMany
    {
        return $this->hasMany('App\Models\Favorite', 'id_home');
    }

    /**
     * @return HasMany
     */
    public function homePics(): HasMany
    {
        return $this->hasMany('App\Models\HomePic', 'id_home');
    }

    /**
     * @return HasMany
     */
    public function homeViews(): HasMany
    {
        return $this->hasMany('App\Models\HomeView', 'id_home');
    }

    /**
     * @return HasMany
     */
    public function homeComments(): HasMany
    {
        return $this->hasMany('App\Models\HomeComment', 'id_home');
    }

}
