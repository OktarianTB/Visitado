// layers = [{color: "orange", locations, button: true}]

const mapSettings = (layers, search, zoom=9, center=[114.1098795, 22.2976036]) => {
  const settings = {
    displaySearch: search,
    zoom,
    center,
    markerLayers: layers.map((layer, index) => {
      return {
        imageUrl: `http://maps.google.com/mapfiles/ms/micons/${layer.color}-dot.png`,
        data: {
          type: "FeatureCollection",
          features: layer.locations.map((loc) => {
            return {
              // feature for Mapbox SF
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: loc.coordinates,
              },
              properties: {
                id: loc._id,
                name: loc.name,
              },
            };
          }),
        },
        imageName: `${layer.color}Marker`,
        sourceName: `source${index}`,
        displayButton: layer.button,
      };
    }),
  };

  return settings;
};

export default mapSettings;
