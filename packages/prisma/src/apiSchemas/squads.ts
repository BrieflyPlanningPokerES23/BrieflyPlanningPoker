import { SquadOptionalDefaultsSchema, SquadPartialSchema } from "../generated/zod";
import { z } from "zod";

/** Esquema para criacao de squads */
export const createSchema = SquadOptionalDefaultsSchema.strict();
/**
 * Esquema para listar squads **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findSchema = z.object({}).strict();

/**
 * Esquema para listar todos os squads **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findAllSchema = z.object({}).strict();

/** Esquema para update de squads */
export const updateSchema = SquadPartialSchema.strict();

/** Esquema para adicionar um usuario a uma squad */
export const addUsersSchema = z.object({
    email: z.string().email(),
    owner: z.boolean(),
  }).strict();

/**
 * Esquema para sair de um squad **(vazio)**
 * 
 * Não sei se precisa...
 */
export const delUsersSchema = z.object({}).strict();
