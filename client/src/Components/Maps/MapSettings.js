// layers = [{color: "orange", locations, button: true}]

const mapSettings = (layers, search) => {
  const settings = {
    displaySearch: search,
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
