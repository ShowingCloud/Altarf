#!/bin/bash

set -x

thin stop
thin -d -p 3210 -e production --tag "QZZStore Production" start
