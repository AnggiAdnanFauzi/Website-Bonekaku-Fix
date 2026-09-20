<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model {
    protected $fillable = ['artikel_id','name','email','website','content'];

    public function artikel() {
        return $this->belongsTo(Artikel::class, 'artikel_id');
    }
}
