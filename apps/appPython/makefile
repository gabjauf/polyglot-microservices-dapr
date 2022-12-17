.PHONY: help run
.DEFAULT_GOAL := help

help:  ## 💬 This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

run:
	dapr run --app-id appPython --app-port 5000 --dapr-http-port 3502 python hello-world.py

stop:
	dapr stop --app-id appPython