#!/usr/bin/env python2
import json

import psnprices


def game(name):
    cur = psnprices.psn.getItemForCid(psnprices.psn.getCidForName(name, 'US/en')[0], 'US/en')
    json.dump(cur, open('{}.json'.format(name), 'w'))


if __name__ == '__main__':
    import sys
    game(sys.argv[1])
