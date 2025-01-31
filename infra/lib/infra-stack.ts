import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an ECR repository
    const repository = new ecr.Repository(this, 'TestAppRepository', {
      repositoryName: 'testapp-repo',
    });

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'TestAppVpc', {
      maxAzs: 2,
    });

    // Create an ECS §uster
    const cluster = new ecs.Cluster(this, 'TestAppCluster', {
      vpc,
      clusterName: 'testapp-cluster',
    });

    // Create a task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TestAppTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Add a container to the task definition
    taskDefinition.addContainer('TestAppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      memoryLimitMiB: 512,
      cpu: 256,
      environment: {
        REQUIRED_SETTING: 'some_value',
      },
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'testapp' }),
    });

    // Create an ECS service
    new ecs.FargateService(this, 'TestAppService', {
      cluster,
      taskDefinition,
      desiredCount: 1,
      serviceName: 'testapp-service',
    });
  }
}