---
id: data-hf
title: Data-hf
sidebar_position: 2
slug: /data-hf
sidebar_label: Data-hf
---

## Openai Module Module

This module performs tests on truthful_qa.

To serve the module

#### Bash

```bash
c data.hf serve tag=10 path=truthful_qa
```

#### Python

```python
c.serve('data.hf', tag=10, path='truthful_qa')
```

To register the module

#### Bash

```bash
c data.hf register tag=10 path=truthful_qa
```

#### Python

```python
c.register('data.hf', tag=10, path='truthful_qa')
```
