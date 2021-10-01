#!/bin/bash

ng build --prod=false
gsutil -m cp app.yaml gs://front_bucket1
gsutil -m cp -R dist gs://front_bucket1
