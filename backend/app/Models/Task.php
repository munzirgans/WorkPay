<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        "description", "date", "additional_charges"
    ];

    public function assignments(){
        return $this->hasMany(TaskAssignment::class);
    }
}
