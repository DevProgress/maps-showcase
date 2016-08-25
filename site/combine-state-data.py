#!/usr/bin/env python

"""Combine text and json data from mocks to make a clean file."""

import json
import os
from shutil import copyfile


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

        art_dir = 'img/artwork/' + states_data[key]['stateCode']
        pattern_dir = 'img/pattern/' + states_data[key]['stateCode']
        try:
            # count the patterns so we can restrict arrow navigation in modal
            states_data[key]['artworkCount'] = len([name for name in os.listdir(art_dir)])

            # count the patterms so we can restrict arrow navigation in modal
            states_data[key]['patternCount'] = len([name for name in os.listdir(pattern_dir)])
        except:
            states_data[key]['artworkCount'] = 0
            states_data[key]['patternCount'] = 0
            print("No images for {}".format(states_data[key]['stateCode']))

        # base data started keyed to ints, but we key to stateCode instead
        new_dict[states_data[key]['stateCode']] = states_data[key]

        if not os.path.exists(art_dir):
            os.makedirs(art_dir)
        src = 'data/pdf-rip-img/' + states_data[key]['stateCode'] + '-artifact.jpg'
        dst = art_dir + '/1.jpg'
        try:
            copyfile(src, dst)
        except:
            print("can't copy artifact for {}".format(states_data[key]['stateCode']))

        if not os.path.exists(pattern_dir):
            os.makedirs(pattern_dir)
        src = 'data/pdf-rip-img/' + states_data[key]['stateCode'] + '-pattern.png'
        dst = 'img/pattern/' + states_data[key]['stateCode'] + '/1.png'
        try:
            copyfile(src, dst)
        except:
            print("can't copy artifact for {}".format(states_data[key]['stateCode']))

    with open('data/gen/states-data.json', 'w') as outfile:
        json.dump(new_dict, outfile)


main()
