# APPS := $(wildcard apps/*)
APPS := apps/app3 apps/app2 apps/appPython

.PHONY: help run stop $(APPS)
.DEFAULT_GOAL := help

help:  ## 💬 This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

run: ## ⚡️ Run all projects
	for dir in $(APPS); do \
		$(MAKE) -C $$dir run & \
	done
	wait

stop: ## 🛑 Stop all projects
	for dir in $(APPS); do \
		$(MAKE) -C $$dir stop & \
	done
	wait
	echo "All done"
