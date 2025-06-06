'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function Location() {
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMap = () => {
      try {
        // Verificar si ya existe el script de Google Maps
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
          return;
        }

        // Usar la API key de las variables de entorno o la fallback
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDbYaX7YjyQfhJNqVPqakQ2FMjlvi-6Xx4';
        
        if (!apiKey) {
          console.error('API key no encontrada');
          setMapError('Error de configuración: API key no encontrada');
          setIsLoading(false);
          return;
        }

        // Función para inicializar el mapa
        window.initMap = () => {
          try {
            const location = { lat: -31.42240293571765, lng: -64.17955410864722 }; // Bv Illia 499, Córdoba
            const mapElement = document.getElementById('map');
            
            if (!mapElement) {
              throw new Error('Elemento del mapa no encontrado');
            }

            const map = new window.google.maps.Map(mapElement, {
              center: location,
              zoom: 18,
              styles: [
                {
                  elementType: 'geometry',
                  stylers: [{ color: '#242f3e' }],
                },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#242f3e' }],
                },
                {
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#746855' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{ color: '#38414e' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#212a37' }],
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#9ca5b3' }],
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#d59563' }],
                },
              ],
            });

            const marker = new window.google.maps.Marker({
              position: location,
              map: map,
              title: 'Albuche Hamburguesas',
              animation: window.google.maps.Animation.DROP,
            });

            // Agregar InfoWindow
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="color: black; padding: 8px;">
                  <h3 style="margin: 0 0 8px 0; font-weight: bold;">Albuche Hamburguesas</h3>
                  <p style="margin: 0;">Bv. Illia 499, Córdoba Capital</p>
                </div>
              `,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            setIsLoading(false);
          } catch (error) {
            console.error('Error al inicializar el mapa:', error);
            setMapError('Error al cargar el mapa');
            setIsLoading(false);
          }
        };

        // Cargar el script de Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          setMapError('Error al cargar Google Maps');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error al cargar el script de Google Maps:', error);
        setMapError('Error al cargar Google Maps');
        setIsLoading(false);
      }
    };

    loadMap();

    return () => {
      // Limpiar el callback global
      window.initMap = () => {};
      // Remover el script si existe
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <section id="location" className="py-16 bg-albuche-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Ubicación</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div
              id="map"
              className="w-full h-[400px] rounded-lg shadow-lg bg-gray-800"
            ></div>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-albuche-orange"></div>
              </div>
            )}
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                <div className="text-red-500 text-center p-4">
                  <p className="font-bold mb-2">Error</p>
                  <p>{mapError}</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg mb-2 text-white">Dirección del local</p>
            <p className="text-gray-400">Bv. Illia 499, Córdoba Capital</p>
            <p className="text-gray-400">Horario: Martes a Domingo de 19:00 a 00:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
