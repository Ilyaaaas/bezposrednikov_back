<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property int $p1
 * @property int $p2
 */
class DicTypeRoom extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'dic_type_room';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['name', 'p1', 'p2'];

}
