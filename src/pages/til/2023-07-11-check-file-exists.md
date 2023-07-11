---
templateKey: til-post
title: Check whether a file or path exists
date: 2023-07-11
tags:
  - python
---

Using the EAFP (Easier to Ask Forgiveness than Permission) principle, we can check whether a file or path exists by attempting to open it and catching the exception if it doesn't exist.

```python
import errno

try:
    with open('file.txt') as f:
        # File exists
except IOError as e:
    # Raise the exception if it's not because the file doesn't exist
    if e.errno != errno.ENOENT:
        raise
    # File does not exist
```

This will also avoid race-conditions if another proces deleted the file between the check and when it is used.
