#!/usr/bin/env python

"""Combine text and json data from mocks to make a clean file."""

import json
import os

def main():
    """Combine states-data.js, stat-names.js, and showcase-text.json."""

    with open('data/states-names.json') as data_file:
        states_data = json.load(data_file)

    with open('data/showcase-text.json') as data_file:
        states_text = json.load(data_file)

    new_dict = {}
    for key in states_data:
        states_data[key] = {'stateName': states_data[key], 'stateCode': key}
        try:
            title = states_text[states_data[key]['stateName']]['title']
            if title == "":
              title = states_text[states_data[key]['stateName']]['year']
            states_data[key]['title'] = title
            states_data[key]['description'] = states_text[states_data[key]['stateName']]['description']
        except:
            print("No pattern title/description for {}").format(states_data[key]['stateName'])

        try:
            # count the patterns so we can restrict arrow navigation in modal
            art_dir = 'img/artwork/' + states_data[key]['stateCode']
            states_data[key]['artworkCount'] = len([name for name in os.listdir(art_dir)])

            # count the patterms so we can restrict arrow navigation in modal
            pattern_dir = 'img/pattern/' + states_data[key]['stateCode']
            states_data[key]['patternCount'] = len([name for name in os.listdir(pattern_dir)])
        except:
            print("No images for {}".format(states_data[key]['stateCode']))

        # base data started keyed to ints, but we key to stateCode instead
        new_dict[states_data[key]['stateCode']] = states_data[key]

    with open('data/gen/states-data.json', 'w') as outfile:
        json.dump(new_dict, outfile)


main()
