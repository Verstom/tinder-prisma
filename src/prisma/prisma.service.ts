import "dotenv/config";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient as UsersClient } from "../generated/users";
import { PrismaClient as InteractionsClient } from "../generated/interactions";
import { PrismaClient as MatchesClient } from "../generated/matches";
import { PrismaClient as MessagesClient } from "../generated/messages";
import { PrismaClient as SubscriptionsClient } from "../generated/subscriptions";

function getEnv(name: string): string {
  const value: string | undefined = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly usersClient = new UsersClient({
    adapter: new PrismaPg({
      connectionString: getEnv("USERS_DATABASE_URL"),
    }),
  });

  private readonly interactionsClient = new InteractionsClient({
    adapter: new PrismaPg({
      connectionString: getEnv("INTERACTIONS_DATABASE_URL"),
    }),
  });

  private readonly matchesClient = new MatchesClient({
    adapter: new PrismaPg({
      connectionString: getEnv("MATCHES_DATABASE_URL"),
    }),
  });

  private readonly messagesClient = new MessagesClient({
    adapter: new PrismaPg({
      connectionString: getEnv("MESSAGES_DATABASE_URL"),
    }),
  });

  private readonly subscriptionsClient = new SubscriptionsClient({
    adapter: new PrismaPg({
      connectionString: getEnv("SUBSCRIPTIONS_DATABASE_URL"),
    }),
  });

  public readonly $transaction = this.messagesClient.$transaction.bind(
    this.messagesClient,
  ) as MessagesClient["$transaction"];

  async onModuleInit(): Promise<void> {
    await Promise.all([
      this.usersClient.$connect(),
      this.interactionsClient.$connect(),
      this.matchesClient.$connect(),
      this.messagesClient.$connect(),
      this.subscriptionsClient.$connect(),
    ]);
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([
      this.usersClient.$disconnect(),
      this.interactionsClient.$disconnect(),
      this.matchesClient.$disconnect(),
      this.messagesClient.$disconnect(),
      this.subscriptionsClient.$disconnect(),
    ]);
  }

  get user() {
    return this.usersClient.user;
  }

  get role() {
    return this.usersClient.role;
  }

  get permission() {
    return this.usersClient.permission;
  }

  get userRole() {
    return this.usersClient.userRole;
  }

  get rolePermission() {
    return this.usersClient.rolePermission;
  }

  get userInteraction() {
    return this.interactionsClient.userInteraction;
  }

  get match() {
    return this.matchesClient.match;
  }

  get message() {
    return this.messagesClient.message;
  }

  get subscription() {
    return this.subscriptionsClient.subscription;
  }
}