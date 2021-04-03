const mapSettings = (locations, search, button) => {
  const settings = {
    displaySearch: search,
    displayButton: button,
    markerLayers: [
      {
        imageUrl: "http://maps.google.com/mapfiles/ms/micons/orange-dot.png",
        data: {
          type: "FeatureCollection",
          features: locations.map((loc) => {
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
        imageName: "orangeMarker",
        sourceName: "source1",
      },
    ],
  };

  return settings;
};

export default mapSettings;
