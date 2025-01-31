import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class DevOpsTestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'DevOpsTestVPC', {
      maxAzs: 2,
    });

    // Create an ECR Repository
    const repository = new ecr.Repository(this, 'DevOpsTestRepo');

    // Create an ECS Cluster
    const cluster = new ecs.Cluster(this, 'DevOpsTestCluster', {
      vpc,
    });

    // Define Task Role
    const taskRole = new iam.Role(this, 'TaskExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonECSTaskExecutionRolePolicy")
      ]
    });

    // Create a Fargate Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'DevOpsTestTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
      executionRole: taskRole
    });

    // Add container to Task Definition
    const container = taskDefinition.addContainer('AppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(repository, 'latest'),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'DevOpsTest' }),
    });
    container.addPortMappings({ containerPort: 8000 });

    // Create an Application Load Balancer
    const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'DevOpsTestALB', {
      vpc,
      internetFacing: true,
    });

    // Create an ALB Listener and Target Group
    const listener = loadBalancer.addListener('Listener', {
      port: 80,
      open: true,
    });

    // Create an ECS Service
    const service = new ecs.FargateService(this, 'DevOpsTestService', {
      cluster,
      taskDefinition,
      desiredCount: 1,
    });

    listener.addTargets('ECS', {
      port: 80,
      targets: [service],
    });
  }
}