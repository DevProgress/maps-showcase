# maps-showcase
Mobile friendly website with video landing page, slideshows, slideshow selector in the form of a map of the US.

# Demo

https://devprogress.tech/maps-showcase/site/

# Run the site Locally (MacOS)

    cd PATH_TO_REPO/site
    python -m SimpleHTTPServer 8000

Then goto http://localhost:8000 in your browser.

# Generating gen/states-data.json

This is how we combine the data we ripped from the PDF and other data for the demo.

    cd PATH_TO_REPO/assets
    python combine-state-data.py

# Style guide

2 space indentation in js / html / css

# Icons for navigation
These are from https://github.com/google/material-design-icons
Used under the CC attribution 4.0 liscense https://creativecommons.org/licenses/by/4.0/