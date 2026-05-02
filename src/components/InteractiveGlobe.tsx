import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import type { CountryData } from "@/data/countries";
import { countries } from "@/data/countries";

interface InteractiveGlobeProps {
  visible: boolean;
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
}

const GEOJSON_URL = "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";

interface GeoJsonFeature {
  properties: {
    ISO_A3: string;
    NAME: string;
    [key: string]: unknown;
  };
  geometry: unknown;
}

export default function InteractiveGlobe({ visible, selectedCountry, onSelectCountry }: InteractiveGlobeProps) {
  const globeRef = useRef<GlobeMethods>(null!);
  const [countriesGeoJson, setCountriesGeoJson] = useState<{ features: GeoJsonFeature[] }>({ features: [] });
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then((data: { features: GeoJsonFeature[] }) => setCountriesGeoJson(data))
      .catch(err => console.error("Failed to load GeoJSON:", err));
  }, []);

  // Map our country data to the GeoJSON features
  const countryDataMap = useMemo(() => {
    const map = new Map<string, CountryData>();
    countries.forEach(c => map.set(c.isoA3, c));
    return map;
  }, []);

  // Auto-rotate and camera handling
  useEffect(() => {
    if (!globeRef.current) return;
    const globe = globeRef.current;
    
    // Auto-rotate settings
    globe.controls().autoRotate = !selectedCountry;
    globe.controls().autoRotateSpeed = 0.5;
    
    if (selectedCountry) {
      globe.pointOfView({
        lat: selectedCountry.coordinates[0],
        lng: selectedCountry.coordinates[1],
        altitude: 1.8
      }, 1000);
    }
  }, [selectedCountry]);

  const handlePolygonClick = useCallback((obj: object) => {
    const feature = obj as GeoJsonFeature;
    const isoA3 = feature.properties.ISO_A3;
    const country = countryDataMap.get(isoA3);
    if (country) {
      onSelectCountry(country);
    }
  }, [countryDataMap, onSelectCountry]);

  // Premium Customization
  const polygonColor = useCallback((d: object) => {
    const feature = d as GeoJsonFeature;
    const isoA3 = feature.properties.ISO_A3;
    const isSelected = selectedCountry?.isoA3 === isoA3;
    const isHovered = hoveredCountry === isoA3;
    const hasData = countryDataMap.has(isoA3);

    if (isSelected) return "rgba(201, 162, 39, 0.8)";
    if (isHovered) return hasData ? "rgba(201, 162, 39, 0.4)" : "rgba(255, 255, 255, 0.1)";
    return hasData ? "rgba(201, 162, 39, 0.15)" : "rgba(30, 30, 45, 0.3)";
  }, [selectedCountry, hoveredCountry, countryDataMap]);

  if (!visible) return null;

  return (
    <div 
      id="interactive-globe-container"
      role="img"
      aria-label="Interactive 3D visualization of global electoral systems"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 500ms ease",
        pointerEvents: visible ? "all" : "none",
        backgroundColor: "#0a0a0f"
      }}
    >
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        lineHoverPrecision={4}
        
        polygonsData={countriesGeoJson.features}
        polygonSideColor={() => "rgba(30, 30, 45, 0.3)"}
        polygonStrokeColor={(d: object) => countryDataMap.has((d as GeoJsonFeature).properties.ISO_A3) ? "#c9a227" : "#1e1e2d"}
        polygonCapColor={polygonColor}
        polygonLabel={(d: object) => {
          const feature = d as GeoJsonFeature;
          const name = feature.properties.NAME;
          const country = countryDataMap.get(feature.properties.ISO_A3);
          const hasData = !!country;
          return `
            <div class="p-4 rounded-xl shadow-2xl" style="background: #13131f; border: 1px solid #c9a227; color: #ffffff; font-family: 'Inter', sans-serif; pointer-events: none; min-width: 240px;">
              <div class="flex items-center justify-between gap-3 mb-2">
                <span class="text-xl font-bold">${name}</span>
                ${hasData ? `<span class="text-2xl">${country.flag}</span>` : ""}
              </div>
              
              ${hasData ? `
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span class="text-[11px] font-bold tracking-wider text-red-500 uppercase">Upcoming Election</span>
                  </div>
                  <div class="text-lg font-medium text-[#c9a227]">${country.upcomingElections.date}</div>
                  <div class="text-xs text-[#a0a0b0] italic">${country.upcomingElections.type}</div>
                  <div class="pt-2 border-t border-[#1e1e2d] mt-2 text-[11px] text-[#555560] uppercase tracking-widest">Click for full strategy analysis</div>
                </div>
              ` : `
                <div class="text-[#555560] text-xs">Navigation only - Data pending</div>
              `}
            </div>
          `;
        }}
        onPolygonHover={(obj: object | null) => setHoveredCountry(obj ? (obj as GeoJsonFeature).properties.ISO_A3 : null)}
        onPolygonClick={handlePolygonClick}
        onGlobeClick={() => {}}

        atmosphereColor="#c9a227"
        atmosphereAltitude={0.15}
        
        pointsData={countries}
        pointLat={(d: object) => (d as CountryData).coordinates[0]}
        pointLng={(d: object) => (d as CountryData).coordinates[1]}
        pointColor={() => "#c9a227"}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointsMerge={true}
        onPointClick={(point: object) => {
          onSelectCountry(point as CountryData);
        }}
      />
    </div>
  );
}
