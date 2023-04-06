# leaflet-challenge
The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

This project helps to build a visualization tool for the USGS to visualize earthquake data. USGS collects a massive amount of data from all over the world each day. This tool helps make the data presented in a more meaningful way of displaying it to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. This tool uses a link from the USGS GeoJSON FeedLinks.

This tool uses Leaflet to create a map that plots all the earthquakes from the dataset based on their longitude and latitude.

The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.

On clicking the data marker, popups provide additional information about the earthquake.

