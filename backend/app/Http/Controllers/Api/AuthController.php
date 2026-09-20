<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller {
    public function login(Request $request) {
        $request->validate(['email'=>'required|email','password'=>'required']);
        $throttleKey = Str::lower($request->email).'|'.$request->ip();
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json(['message'=>"Terlalu banyak percobaan login. Coba lagi dalam {$seconds} detik."], 429);
        }
        if (!Auth::attempt($request->only('email','password'))) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json(['message'=>'Email atau password salah.'], 401);
        }
        RateLimiter::clear($throttleKey);
        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('admin-token')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>['name'=>$user->name,'email'=>$user->email]]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out successfully.']);
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
