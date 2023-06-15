---
id: Introduction v0
sidebar_position: 1
slug: Introduction
sidebar_label: 👋 Introduction
---

# Introduction

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

# Create a Module

A module is class that forms the backbone of commune. It consists of a set of helper functions that are useful to the developer.  For example, if you want to load a JSON, you will need to setup the environment and have several steps.

```python 
import json

# Specify the path to your JSON file
file_path = 'path/to/your/file.json'

# Open the JSON file
with open(file_path, 'r') as file:
    # Load the JSON data
    data = json.load(file)


```

 After you create , you can put it as a function that you can reuse for later. The module essentially consists of functions that the developer can reuse 

```python title="commune/module/module.py"

# In commune/module/module.py
class Module:
  ...
  def load_json(file_path:str)
    import json
    with open(file_path, 'r') as file:
        # Load the JSON data
        data = json.load(file)
    return data
  ...

```



This function will be added to the module and the command line automatically such that you can now import a json as follows

```python

import commune as c
c.load_json('path/to/your/file.json')

```

