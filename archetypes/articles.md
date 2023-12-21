---
title: "{{ .Name | replaceRE "^[0-9]+-" "" | humanize | title }}"
date: {{ .Date }}
draft: true
tags:
- programming
- hacking
---
