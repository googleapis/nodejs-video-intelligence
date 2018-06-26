import synthtool as s
import synthtool.gcp as gcp
import logging
from pathlib import Path
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGenerator()

versions = ['v1', 'v1beta1', 'v1beta2', 'v1p1beta1']

for version in versions:
    library = gapic.node_library(
        'video-intelligence', version,
        config_path="/google/cloud/videointelligence/"
                    f"artman_videointelligence_{version}.yaml")

    # skip index, protos, package.json, and README.md
    s.copy(
        library,
        excludes=['package.json', 'README.md', 'src/index.js'],
    )

#
# Node.js specific cleanup
#
subprocess.run(['npm', 'install'])

# # prettify and lint
subprocess.run(['npm', 'run', 'prettier'])
subprocess.run(['npm', 'run', 'lint'])
