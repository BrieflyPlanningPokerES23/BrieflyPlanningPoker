import { SquadOptionalDefaultsSchema, SquadPartialSchema, SquadSchema } from "../generated/zod";
import { z } from "zod";

/** Esquema para criacao de squads - request */
export const createSchemaReq = SquadOptionalDefaultsSchema.strict();

/** Esquema para criacao de squads - response */
export const createSchemaRes = SquadSchema.strict();

/**
 * Esquema para listar squads - request **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findSchemaReq = z.object({}).strict();

/** Esquema para listar uma squad - response */
export const findSchemaRes = createSchemaRes;

/**
 * Esquema para listar todos os squads - request **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findAllSchemaReq = z.object({}).strict();

/** Esquema para listar squads - response */
export const findAllSchemaRes = z.array(createSchemaRes);

/** Esquema para update de squads - request */
export const updateSchemaReq = SquadPartialSchema.strict();

/** Esquema para update de squads - response */
export const updateSchemaRes = createSchemaRes;

/** Esquema para adicionar um usuario a uma squad - request */
export const addUsersSchemaReq = z.object({email: z.string().email(),owner: z.boolean()}).strict();

/** Esquema para adicionar um usuario a uma squad - response */
export const addUsersSchemaRes = createSchemaRes;

/**
 * Esquema para sair de um squad - request**(vazio)**
 * 
 * Não sei se precisa...
 */
export const delUsersSchemaReq = z.object({}).strict();

/** Esquema para sair de um squad - response */
export const delUsersSchemaRes = createSchemaRes;

// Tipos
export type CreateSchemaReq = z.infer<typeof createSchemaReq>;
export type CreateSchemaRes = z.infer<typeof createSchemaRes>;
export type FindSchemaReq = z.infer<typeof findSchemaReq>;
export type FindSchemaRes = z.infer<typeof findSchemaRes>;
export type FindAllSchemaReq = z.infer<typeof findAllSchemaReq>;
export type FindAllSchemaRes = z.infer<typeof findAllSchemaRes>;
export type UpdateSchemaReq = z.infer<typeof updateSchemaReq>;
export type UpdateSchemaRes = z.infer<typeof updateSchemaRes>;
export type AddUsersSchemaReq = z.infer<typeof addUsersSchemaReq>;
export type AddUsersSchemaRes = z.infer<typeof addUsersSchemaRes>;
export type DelUsersSchemaReq = z.infer<typeof delUsersSchemaReq>;
export type DelUsersSchemaRes = z.infer<typeof delUsersSchemaRes>;