<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\KatalogController;
use App\Http\Controllers\Api\ArtikelController;
use App\Http\Controllers\Api\KomentarController;
use App\Http\Controllers\Api\Admin\KatalogController as AdminKatalogController;
use App\Http\Controllers\Api\Admin\ArtikelController as AdminArtikelController;
use App\Http\Controllers\Api\Admin\KomentarController as AdminKomentarController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

Route::get('/katalog', [KatalogController::class, 'index']);
Route::get('/katalog/bestseller', [KatalogController::class, 'bestseller']);
Route::get('/katalog/newest', [KatalogController::class, 'newest']);
Route::get('/katalog/{id}', [KatalogController::class, 'show']);

Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{slug}', [ArtikelController::class, 'show']);
Route::post('/artikel/{id}/komentar', [KomentarController::class, 'store']);

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::prefix('admin')->group(function () {
        Route::apiResource('katalog', AdminKatalogController::class);
        Route::apiResource('artikel', AdminArtikelController::class);
        Route::get('komentar', [AdminKomentarController::class, 'index']);
        Route::delete('komentar/{id}', [AdminKomentarController::class, 'destroy']);
    });
});
