<?php
namespace App\Helpers;

use Intervention\Image\Facades\Image;

class ImageHelpers
{
    protected $upload_path;
    public function __construct()
    {
        $this->upload_path = public_path()."/upload/";
    }

    public function base64_save_image($base64){
        $s = explode(';', $base64);
        $type = str_replace('data:image/', '', $s[0]);
        if($type == 'jpeg'){
            $type = 'jpg';
        }

        $basename=uniqid();

        $img = str_replace($s[0].';base64,', '', $base64);
        $data = base64_decode($img);
        $file = $this->upload_path . $basename.'.'.$type;
        if(!file_put_contents($file, $data)){
            return false;
        }

        return $basename.'.'.$type;
    }

    public function setWatermark($value)
    {
        $img = Image::make($value);
        $img->insert(public_path()."/images/watermark.png", 'bottom-right', 10, 10);
        $img->save($value);
        return $value;
    }
}
