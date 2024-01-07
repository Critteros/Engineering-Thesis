// public.decorator.ts
import { Reflector } from "@nestjs/core";

export const PublicHandler = Reflector.createDecorator<boolean>();
