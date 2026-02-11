import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  async onModuleInit() {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('mongoose connected');
  }
}
