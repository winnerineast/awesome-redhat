---
tags: [openshift, workloads]
status: stub
created: 2025-07-08
---
# Jobs and CronJobs
> For batch processing and scheduled tasks.

## Job — One-time execution
- `completions` — Number of successful completions needed
- `parallelism` — Max pods running simultaneously
- `backoffLimit` — Retry count before marking as failed

## CronJob — Scheduled execution
- Uses cron syntax for scheduling
- `concurrencyPolicy`: Allow, Forbid, Replace
- `successfulJobsHistoryLimit` / `failedJobsHistoryLimit`

## Related Notes
- [[Deployments-and-DeploymentConfigs]]

---
> [!NOTE]
> #todo — Add Job and CronJob YAML examples.
