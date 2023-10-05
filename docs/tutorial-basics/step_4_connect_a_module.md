---
id: connect-module
title: Connect a Module
sidebar_position: 5
slug: /connect-module
sidebar_label: Connect a Module
---

# Connect a Module

To connect with a module within a namespace, do this:

```python

model = c.connect('model')
```

Once you connected to the model, you can query it as if it was local

```python
response = model.forward(x='yo whadup fam')

```

# View info or schema of the module

```python
model.info() # view all the info of the function
```

This includes the functions and attributes

# View info of the module

```python
model.schema()
```
