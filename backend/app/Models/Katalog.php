<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Katalog extends Model {
    protected $fillable = ['name','category','price','description','image','is_bestseller'];
    protected $casts = ['is_bestseller' => 'boolean'];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            if (str_starts_with($this->image, 'http') || str_starts_with($this->image, 'data:')) {
                return $this->image;
            }
            $img = ltrim($this->image, '/');
            return asset('storage/' . $img);
        }
        return null;
    }
}