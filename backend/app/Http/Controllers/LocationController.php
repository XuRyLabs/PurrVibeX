<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function cities(string $country): JsonResponse
    {
        $country = strtoupper(trim($country));

        if ($country === 'VN') {
            return $this->vnCities();
        }

        return $this->geoNamesCities($country);
    }

    public function wards(string $country, string $cityCode): JsonResponse
    {
        $country = strtoupper(trim($country));

        if ($country === 'VN') {
            return $this->vnWards($cityCode);
        }

        return $this->geoNamesWards($cityCode);
    }

    private function vnCities(): JsonResponse
    {
        $res = Http::timeout(12)->get('https://provinces.open-api.vn/api/v2/p/');

        if (!$res->ok()) {
            return response()->json(['error' => 'Failed to fetch cities {$res}', 'cities' => []]);
        }

        $cities = collect($res->json())
            ->map(fn ($p) => [
                'code' => (string) ($p['code'] ?? ''),
                'name' => (string) ($p['name'] ?? ''),
            ])
            ->filter(fn ($c) => $c['code'] !== '' && $c['name'] !== '')
            ->sortBy('name')
            ->values();

        return response()->json(['cities' => $cities]);
    }

    private function vnWards(string $provinceCode): JsonResponse
    {
        $res = Http::timeout(12)->get("https://provinces.open-api.vn/api/v2/p/{$provinceCode}", [
            'depth' => 2,
        ]);

        if (!$res->ok()) {
            return response()->json(['wards' => []]);
        }

        $payload = $res->json();

        // Shape A: root has wards directly.
        $directWards = collect($payload['wards'] ?? [])
            ->map(fn ($w) => [
                'code' => (string) ($w['code'] ?? ''),
                'name' => (string) ($w['name'] ?? ''),
            ])
            ->filter(fn ($w) => $w['code'] !== '' && $w['name'] !== '');


        $wards = ($directWards->isNotEmpty() ? $directWards : $nestedWards)
            ->sortBy('name')
            ->values();

        return response()->json(['wards' => $wards]);
    }

    /**
     * Free endpoint for non-VN: GeoNames (requires free username in env).
     * Set GEONAMES_USERNAME in env (fallback: demo, rate-limited).
     */
    private function geoNamesCities(string $countryCode): JsonResponse
    {
        $username = env('GEONAMES_USERNAME', 'demo');

        $res = Http::timeout(12)->get('https://secure.geonames.org/searchJSON', [
            'country' => $countryCode,
            'featureClass' => 'P',
            'maxRows' => 200,
            'orderby' => 'population',
            'username' => $username,
        ]);

        if (!$res->ok()) {
            return response()->json(['cities' => []]);
        }

        $seen = [];
        $cities = collect($res->json('geonames', []))
            ->map(function ($g) use (&$seen) {
                $name = (string) ($g['name'] ?? '');
                $code = (string) ($g['geonameId'] ?? '');
                $key = mb_strtolower($name);

                if ($name === '' || $code === '' || isset($seen[$key])) {
                    return null;
                }

                $seen[$key] = true;
                return ['code' => $code, 'name' => $name];
            })
            ->filter()
            ->values();

        return response()->json(['cities' => $cities]);
    }

    private function geoNamesWards(string $cityGeoNameId): JsonResponse
    {
        $username = env('GEONAMES_USERNAME', 'demo');

        $res = Http::timeout(12)->get('https://secure.geonames.org/childrenJSON', [
            'geonameId' => $cityGeoNameId,
            'maxRows' => 300,
            'username' => $username,
        ]);

        if (!$res->ok()) {
            return response()->json(['wards' => []]);
        }

        $wards = collect($res->json('geonames', []))
            ->map(fn ($g) => [
                'code' => (string) ($g['geonameId'] ?? ''),
                'name' => (string) ($g['name'] ?? ''),
            ])
            ->filter(fn ($w) => $w['code'] !== '' && $w['name'] !== '')
            ->sortBy('name')
            ->values();

        return response()->json(['wards' => $wards]);
    }
}

