---
templateKey: til-post
title: Transactionally staged job drains
date: 2023-07-11T15:26:10.000Z
tags:
  - python
  - django
---

Queuing celery tasks on commit runs the risk of them not being queued properly if
the program crashes after the transaction commits and before the task is queued.

The solution is to use a transactionally staged job drain as outlined in this [article](https://brandur.org/job-drain).

With this pattern, jobs aren’t immediately sent to the job queue. Instead, they’re staged in a table within the relational database itself, and the ACID properties of the running transaction keep them invisible until they’re ready to be worked. A secondary enqueuer process reads the table and sends any jobs it finds to the job queue before removing their rows.

The jobs table would look something like this:

```sql
CREATE TABLE staged_jobs (
    id       BIGSERIAL PRIMARY KEY,
    job_name TEXT      NOT NULL,
    job_args JSONB     NOT NULL
);
```

The enqueuer process would look something like this:

```python
from django.db import transaction
from myapp.models import StagedJob
from . import enqueue


import time

BATCH_SIZE = 10

def enqueue_jobs():
    # Only one enqueuer should be running at any given time.
    with transaction.atomic(using='enqueuer'):
        while True:
            # Need at least repeatable read isolation level so that our DELETE after
            # enqueueing will see the same jobs as the original SELECT.
            with transaction.atomic(isolation=transaction.ISOLATION_LEVEL_REPEATABLE_READ):
                jobs = StagedJob.objects.order_by('id')[:BATCH_SIZE]

                if jobs:
                    for job in jobs:
                        enqueue(job.job_name, *job.job_args)

                    StagedJob.objects.filter(id__lte=jobs.values_list('id')).delete()

```
