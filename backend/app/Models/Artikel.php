<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'content', 'image', 'author', 'published_at'
    ];

    protected $casts = ['published_at' => 'date'];

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

    public function komentars()
    {
        return $this->hasMany(Komentar::class);
    }
}