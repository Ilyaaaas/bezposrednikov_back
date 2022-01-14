<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ConfigHelpers
{
    /**
     * @return bool
     */
    public static function IsAdmin(): bool
    {
        $user_id = auth()->user()->getAuthIdentifier();
        $user = User::find($user_id);
        return ((int) $user->id_role !== 1);
    }
}
