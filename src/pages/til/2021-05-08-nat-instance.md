---
templateKey: til-post
title: NAT Instances for your hobby project
date: 2021-05-09T15:04:10.000Z
tags:
  - AWS
---

AWS NAT Gateways are bloody expensive (for a hobby project that is).

My bill for last month was over 40 squid due to just the NAT Gateway.

I ended up replacing the NAT Gateway in my project with a NAT instance uisng this [terraform module](https://github.com/int128/terraform-aws-nat-instance).

It advises users not to use it in a production environment but my servers in the private subnets don't need outbound internet connectivity all the time.

My RDS instance doesn't need to communicate outbound and traffic to the app servers comes via the load balancers.
I believe the only time outbound connectivity is required is for connecting to AWS services like logs (and EC2 fargate?).

The `terraform-aws-nat-instance` module provides a tiny NAT instance that has an autoscaling group. I think this is good for now!
