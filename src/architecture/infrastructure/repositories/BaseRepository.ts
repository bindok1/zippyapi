
import { IBaseRepository } from '@/architecture/domain/repositories/IBaseRepository';
import { supabase } from '../client';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly tableName: string) {}

  async findAll(): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*');
    
    if (error) throw error;
    return data as T[];
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as T;
  }

  async create(data: Partial<T>): Promise<T> {
    const { data: created, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return created as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const { data: updated, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updated as T;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}