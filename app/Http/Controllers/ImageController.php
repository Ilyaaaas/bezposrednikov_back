<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelpers;
use App\Models\UploadPicter;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function saveImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($image = $request->file('image')) {
            $destinationPath = public_path().'/upload/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);

            (new ImageHelpers())->setWatermark(public_path()."/upload/$profileImage");

            try {
                UploadPicter::create([
                    'picter_url' => $profileImage
                ]);

                return $this->sendSuccess(["image" => "/upload/$profileImage"]);
            }catch (\Exception $e){
                return $this->sendError($e->getMessage());
            }
        }else{
            return $this->sendError("Переданы не правельные параметры");
        }
    }
}
