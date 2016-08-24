#!/usr/bin/env python

"""Combine text and json data from mocks to make a clean file."""

import json


def main():
    """Combine states-data.js, stat-names.js, and showcase-text.json."""

    with open('data/states-data.json') as data_file:
        states_data = json.load(data_file)

    with open('data/states-names.json') as data_file:
        states_names = json.load(data_file)

    with open('data/showcase-text.json') as data_file:
        states_text = json.load(data_file)


    for key in states_data:
        states_data[key]['stateName'] = states_names[states_data[key]['stateCode']]
        try:
            title = states_text[states_data[key]['stateName']]['title']
            if title == "":
              title = states_text[states_data[key]['stateName']]['year']
            states_data[key]['historicalArtifactImageTitle'] = title
            states_data[key]['historicalArtifactData'] = states_text[states_data[key]['stateName']]['description']
        except:
            print("No pattern title/description for {}").format(states_data[key]['stateName'])

    with open('gen/states-data.json', 'w') as outfile:
        json.dump(states_data, outfile)


main()
